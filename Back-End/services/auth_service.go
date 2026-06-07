package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"backend/utils"
	"errors"
)

func RegisterUser(
	req dto.RegisterRequest,
) error {

	_, err := repositories.FindUserByEmail(
		req.Email,
	)

	if err == nil {
		return errors.New(
			"email already registered",
		)
	}

	hashedPassword, err :=
		utils.HashPassword(
			req.PasswordHash,
		)

	if err != nil {
		return errors.New(
			"failed to hash password",
		)
	}

	tx := database.DB.Begin()

	user := models.User{
		FullName:     req.FullName,
		Email:        req.Email,
		PasswordHash: hashedPassword,
		PhoneNumber:  req.PhoneNumber,
		Role:         models.UserRole(req.Role),
		IsVerified:   false,
	}

	if err := repositories.CreateUser(
		tx,
		&user,
	); err != nil {

		tx.Rollback()
		return errors.New(
			"failed to register user",
		)
	}

	if user.Role == models.RoleMerchant {

		business := models.Business{
			OwnerID:      user.ID,
			BusinessName: "Untitled Business",
			Description:  "",
			Category:     models.CategoryOther,
			LogoURL:      "",
			IsVerified:   false,
		}

		if err := repositories.CreateBusiness(
			tx,
			&business,
		); err != nil {

			tx.Rollback()
			return errors.New(
				"failed to create business",
			)
		}

		location := models.BusinessLocation{
			BusinessID:  business.ID,
			Address:     "-",
			City:        "-",
			Province:    "-",
			PostalCode:  "",
			Latitude:    0,
			Longitude:   0,
			OpeningTime: "00:00:00",
			ClosingTime: "00:00:00",
		}

		if err := repositories.
			CreateBusinessLocation(
				tx,
				&location,
			); err != nil {

			tx.Rollback()
			return errors.New(
				"failed to create business location",
			)
		}
	}

	if err := tx.Commit().Error; err != nil {

		tx.Rollback()

		return errors.New(
			"failed to complete registration",
		)
	}

	return nil
}

func LoginUser(
	req dto.LoginRequest,
) (dto.LoginResponse, error) {

	user, err := repositories.
		FindUserByEmail(
			req.Email,
		)

	if err != nil {

		return dto.LoginResponse{},
			errors.New(
				"invalid email or password",
			)
	}

	if err := utils.ComparePassword(
		user.PasswordHash,
		req.Password,
	); err != nil {

		return dto.LoginResponse{},
			errors.New(
				"invalid email or password",
			)
	}

	token, err := utils.GenerateJWT(
		user.ID,
		string(user.Role),
	)

	if err != nil {

		return dto.LoginResponse{},
			errors.New(
				"failed to generate token",
			)
	}

	return dto.LoginResponse{
		Role:  string(user.Role),
		Token: token,
	}, nil
}
