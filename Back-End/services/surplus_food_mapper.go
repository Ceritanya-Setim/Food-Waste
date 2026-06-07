package services

import (
	"backend/dto"
	"backend/models"
)

func mapSurplusFoodResponse(
	food models.SurplusFood,
) dto.SurplusFoodResponse {

	return dto.SurplusFoodResponse{
		ID:            food.ID,
		ImageURL:      food.ImageURL,
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
			food.
				BusinessLocation.
				Business.
				Category,
		),

		City: food.BusinessLocation.City,
	}
}

func mapSurplusFoodDetail(
	food models.SurplusFood,
) dto.SurplusFoodDetailResponse {

	return dto.SurplusFoodDetailResponse{
		ID:                 food.ID,
		ImageURL:           food.ImageURL,
		Title:              food.Title,
		Description:        food.Description,
		OriginalPrice:      food.OriginalPrice,
		DiscountPrice:      food.DiscountPrice,
		QuantityAvailable:  food.QuantityAvailable,
		QuantityRemaining:  food.QuantityRemaining,
		Status:             string(food.Status),
		PickupStartTime:    food.PickupStartTime,
		PickupEndTime:      food.PickupEndTime,
		ExpiryTime:         food.ExpiryTime,
		BusinessLocationID: food.BusinessLocationID,
	}
}
