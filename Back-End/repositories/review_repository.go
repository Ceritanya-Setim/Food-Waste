package repositories

import (
	"backend/database"
	"backend/models"
)

func GetReviewsByFoodID(foodID string) ([]models.Reviews, error) {
	var reviews []models.Reviews
	err := database.DB.Preload("User").
		Where("surplus_food_id = ?", foodID).
		Find(&reviews).Error
	return reviews, err
}
