package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"backend/utils"
	"errors"
)

func RegisterUser(req dto.RegisterRequest) error {

	var existingUser models.User

	if err := database.DB.
		Where("email = ?", req.Email).
		First(&existingUser).
		Error; err == nil {

		return errors.New("email already registered")
	}

	hashedPassword, err := utils.HashPassword(req.PasswordHash)

	if err != nil {
		return errors.New("failed to hash password")
	}

	user := models.User{
		FullName:     req.FullName,
		Email:        req.Email,
		PasswordHash: hashedPassword,
		PhoneNumber:  req.PhoneNumber,
		Role:         models.UserRole(req.Role),
		IsVerified:   false,
	}

	if err := database.DB.Create(&user).Error; err != nil {

		return errors.New("failed to register user")
	}

	return nil
}

func LoginUser(
	req dto.LoginRequest,
) (dto.LoginResponse, error) {

	var user models.User

	if err := database.DB.
		Where("email = ?", req.Email).
		First(&user).Error; err != nil {

		return dto.LoginResponse{},
			errors.New("invalid email or password")
	}

	if err := utils.ComparePassword(
		user.PasswordHash,
		req.Password,
	); err != nil {

		return dto.LoginResponse{},
			errors.New("invalid email or password")
	}

	token, err := utils.GenerateJWT(
		user.ID,
		string(user.Role),
	)

	if err != nil {

		return dto.LoginResponse{},
			errors.New("failed to generate token")
	}

	response := dto.LoginResponse{
		Role:  string(user.Role),
		Token: token,
	}

	return response, nil
}
