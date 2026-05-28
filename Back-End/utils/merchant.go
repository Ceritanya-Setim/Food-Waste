package utils

import (
	"backend/database"
	"backend/models"
)

func GetMerchantData(
	userID string,
) (
	models.User,
	models.Business,
	models.BusinessLocation,
	error,
) {

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

		return user,
			models.Business{},
			models.BusinessLocation{},
			err
	}

	var business models.Business

	if err := database.DB.
		Where("owner_id = ?", userID).
		First(&business).Error; err != nil {

		return user,
			business,
			models.BusinessLocation{},
			err
	}

	var location models.BusinessLocation

	if err := database.DB.
		Where("business_id = ?", business.ID).
		First(&location).Error; err != nil {

		return user,
			business,
			location,
			err
	}

	return user, business, location, nil
}
