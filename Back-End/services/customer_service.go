package services

import (
	"backend/dto"
	"backend/repositories"
	"backend/utils"
	"errors"
)

func GetCustomerProfileService(
	userID string,
) (dto.CustomerProfileResponse, error) {

	user, err := repositories.
		FindUserByID(userID)

	if err != nil {

		return dto.CustomerProfileResponse{},
			errors.New("user not found")
	}

	return dto.CustomerProfileResponse{
		FullName:        user.FullName,
		Email:           user.Email,
		PhoneNumber:     user.PhoneNumber,
		Role:            string(user.Role),
		ProfileImageURL: user.ProfileImageURL,
		RegisteredSince: user.CreatedAt.Format("2006-01-02"),
		LastUpdated:     user.UpdatedAt.Format("2006-01-02"),
	}, nil
}

func UpdateCustomerProfileService(
	userID string,
	req dto.EditProfileRequest,
) (dto.CustomerProfileResponse, error) {

	user, err := repositories.
		FindUserByID(userID)

	if err != nil {

		return dto.CustomerProfileResponse{},
			errors.New("user not found")
	}

	updates := map[string]interface{}{}

	if req.FullName != "" {
		updates["full_name"] = req.FullName
	}

	if req.PhoneNumber != "" {
		updates["phone_number"] = req.PhoneNumber
	}

	if req.ProfileImageURL != "" {
		updates["profile_image_url"] = req.ProfileImageURL
	}

	if req.Password != "" {

		hash, err := utils.HashPassword(
			req.Password,
		)

		if err != nil {

			return dto.CustomerProfileResponse{},
				errors.New(
					"failed to hash password",
				)
		}

		updates["password_hash"] = hash
	}

	if len(updates) == 0 {

		return dto.CustomerProfileResponse{},
			errors.New(
				"no data to update",
			)
	}

	if err := repositories.UpdateUser(
		&user,
		updates,
	); err != nil {

		return dto.CustomerProfileResponse{},
			errors.New(
				"failed to update profile",
			)
	}

	return GetCustomerProfileService(
		userID,
	)
}
