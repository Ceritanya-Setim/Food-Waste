package utils

import (
	"backend/models"
	"time"
)

func GetFoodStatus(
	quantityRemaining int,
	expiryTime time.Time,
) models.FoodStatus {

	if expiryTime.Before(time.Now()) {
		return models.StatusExpired
	}

	if quantityRemaining <= 0 {
		return models.StatusSoldOut
	}

	return models.StatusActive
}
