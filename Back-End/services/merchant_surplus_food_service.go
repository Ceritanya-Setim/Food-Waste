package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"backend/utils"
	"errors"
)

func CreateMerchantSurplusFood(
	userID string,
	req dto.CreateSurplusFoodRequest,
) (dto.SurplusFoodDetailResponse, error) {

	var location models.BusinessLocation

	if err := database.DB.
		Preload("Business").
		Where("id = ?", req.BusinessLocationID).
		First(&location).Error; err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New("business location not found")
	}

	if location.Business.OwnerID != userID {

		return dto.SurplusFoodDetailResponse{},
			errors.New("unauthorized access")
	}

	if req.DiscountPrice > req.OriginalPrice {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"discount price cannot exceed original price",
			)
	}

	food := models.SurplusFood{
		BusinessLocationID: req.BusinessLocationID,
		Title:              req.Title,
		Description:        req.Description,
		OriginalPrice:      req.OriginalPrice,
		DiscountPrice:      req.DiscountPrice,
		QuantityAvailable:  req.QuantityAvailable,
		QuantityRemaining:  req.QuantityAvailable,
		PickupStartTime:    req.PickupStartTime,
		PickupEndTime:      req.PickupEndTime,
		ExpiryTime:         req.ExpiryTime,
	}

	food.Status = utils.GetFoodStatus(
		food.QuantityRemaining,
		food.ExpiryTime,
	)

	if err := database.DB.
		Create(&food).Error; err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New("failed to create food")
	}

	return mapSurplusFoodDetail(food), nil
}

func GetMerchantSurplusFoodDetail(
	userID string,
	foodID string,
) (dto.SurplusFoodDetailResponse, error) {

	var food models.SurplusFood

	if err := database.DB.
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Where("businesses.owner_id = ?", userID).
		Where("surplus_foods.id = ?", foodID).
		First(&food).Error; err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New("food not found")
	}

	food.Status = utils.GetFoodStatus(
		food.QuantityRemaining,
		food.ExpiryTime,
	)

	database.DB.Save(&food)

	return mapSurplusFoodDetail(food), nil
}

func UpdateMerchantSurplusFood(
	userID string,
	foodID string,
	req dto.UpdateSurplusFoodRequest,
) (dto.SurplusFoodDetailResponse, error) {

	var food models.SurplusFood

	if err := database.DB.
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Where("businesses.owner_id = ?", userID).
		Where("surplus_foods.id = ?", foodID).
		First(&food).Error; err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New("food not found")
	}

	if req.DiscountPrice > req.OriginalPrice {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"discount price cannot exceed original price",
			)
	}

	if req.Title != "" {
		food.Title = req.Title
	}

	if req.Description != "" {
		food.Description = req.Description
	}

	if req.OriginalPrice != 0 {
		food.OriginalPrice = req.OriginalPrice
	}

	if req.DiscountPrice != 0 {
		food.DiscountPrice = req.DiscountPrice
	}

	if req.QuantityAvailable > 0 {

		diff := req.QuantityAvailable -
			food.QuantityAvailable

		newRemaining := food.QuantityRemaining + diff

		if newRemaining < 0 {
			newRemaining = 0
		}

		food.QuantityAvailable =
			req.QuantityAvailable

		food.QuantityRemaining =
			newRemaining
	}

	if !req.PickupStartTime.IsZero() {
		food.PickupStartTime = req.PickupStartTime
	}

	if !req.PickupEndTime.IsZero() {
		food.PickupEndTime = req.PickupEndTime
	}

	if !req.ExpiryTime.IsZero() {
		food.ExpiryTime = req.ExpiryTime
	}

	food.Status = utils.GetFoodStatus(
		food.QuantityRemaining,
		food.ExpiryTime,
	)

	if err := database.DB.
		Save(&food).Error; err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New("failed to update food")
	}

	return mapSurplusFoodDetail(food), nil
}

func DeleteMerchantSurplusFood(
	userID string,
	foodID string,
) error {

	var food models.SurplusFood

	if err := database.DB.
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Where("businesses.owner_id = ?", userID).
		Where("surplus_foods.id = ?", foodID).
		First(&food).Error; err != nil {

		return errors.New("food not found")
	}

	if err := database.DB.
		Delete(&food).Error; err != nil {

		return errors.New("failed to delete food")
	}

	return nil
}

func mapSurplusFoodDetail(
	food models.SurplusFood,
) dto.SurplusFoodDetailResponse {

	return dto.SurplusFoodDetailResponse{
		ID:                 food.ID,
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
