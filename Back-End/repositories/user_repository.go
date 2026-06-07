package repositories

import (
	"backend/database"
	"backend/models"
	"errors"

	"gorm.io/gorm"
)

func FindUserByEmail(email string) (models.User, error) {
	var user models.User

	err := database.DB.
		Where("email = ?", email).
		First(&user).
		Error

	return user, err
}

func CreateUser(
	tx *gorm.DB,
	user *models.User,
) error {

	return tx.Create(user).Error
}

func FindUserByID(
	userID string,
) (models.User, error) {

	var user models.User

	err := database.DB.
		Where("id = ?", userID).
		First(&user).
		Error

	return user, err
}

func UpdateUser(
	user *models.User,
	updates map[string]interface{},
) error {

	return database.DB.
		Model(user).
		Updates(updates).
		Error
}

func CheckEmailExists(
	email string,
) (bool, error) {

	var user models.User

	err := database.DB.
		Where("email = ?", email).
		First(&user).
		Error

	if err == nil {
		return true, nil
	}

	if errors.Is(
		err,
		gorm.ErrRecordNotFound,
	) {
		return false, nil
	}

	return false, err
}
