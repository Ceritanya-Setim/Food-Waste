package utils

import (
	"backend/dto"
	"backend/models"
)

func MapSurplusFoodResponse(
	food models.SurplusFood,
) dto.SurplusFoodResponse {

	return dto.SurplusFoodResponse{
		Title:         food.Title,
		Description:   food.Description,
		OriginalPrice: food.OriginalPrice,
		DiscountPrice: food.DiscountPrice,
		PickupEndTime: food.PickupEndTime,
		ExpiryTime:    food.ExpiryTime,
		Status:        string(food.Status),

		BusinessName: food.
			BusinessLocation.
			Business.
			BusinessName,

		Category: string(
			food.BusinessLocation.Business.Category,
		),

		City: food.BusinessLocation.City,
	}
}
