package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"backend/utils"
	"errors"
)

func GetCustomerProfileService(
	userID string,
) (dto.CustomerProfileResponse, error) {

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

		return dto.CustomerProfileResponse{},
			errors.New("user not found")
	}

	response := dto.CustomerProfileResponse{
		FullName:        user.FullName,
		Email:           user.Email,
		PhoneNumber:     user.PhoneNumber,
		Role:            string(user.Role),
		ProfileImageURL: user.ProfileImageURL,
		RegisteredSince: user.CreatedAt.Format("2006-01-02"),
		LastUpdated:     user.UpdatedAt.Format("2006-01-02"),
	}

	return response, nil
}

func UpdateCustomerProfileService(
	userID string,
	req dto.EditProfileRequest,
) (dto.CustomerProfileResponse, error) {

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

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

		hash, err := utils.HashPassword(req.Password)

		if err != nil {

			return dto.CustomerProfileResponse{},
				errors.New("failed to hash password")
		}

		updates["password_hash"] = hash
	}

	if len(updates) == 0 {

		return dto.CustomerProfileResponse{},
			errors.New("no data to update")
	}

	if err := database.DB.
		Model(&user).
		Updates(updates).Error; err != nil {

		return dto.CustomerProfileResponse{},
			errors.New("failed to update profile")
	}

	return GetCustomerProfileService(userID)
}
