package repositories

import (
	"backend/database"
	"backend/models"

	"gorm.io/gorm"
)

func CreateBusiness(
	tx *gorm.DB,
	business *models.Business,
) error {

	return tx.Create(business).Error
}

func CreateBusinessLocation(
	tx *gorm.DB,
	location *models.BusinessLocation,
) error {

	return tx.Create(location).Error
}

func UpdateBusiness(
	business *models.Business,
	updates map[string]interface{},
) error {

	return database.DB.
		Model(business).
		Updates(updates).
		Error
}

func UpdateBusinessLocation(
	location *models.BusinessLocation,
	updates map[string]interface{},
) error {

	return database.DB.
		Model(location).
		Updates(updates).
		Error
}

func FindBusinessLocationByID(
	locationID string,
) (
	models.BusinessLocation,
	error,
) {

	var location models.BusinessLocation

	err := database.DB.
		Preload("Business").
		Where("id = ?", locationID).
		First(&location).
		Error

	return location, err
}
