package services

import (
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"backend/utils"
	"errors"
	"mime/multipart"
)

func CreateMerchantSurplusFood(
	userID string,
	req dto.CreateSurplusFoodRequest,
	file *multipart.FileHeader,
) (
	dto.SurplusFoodDetailResponse,
	error,
) {

	location, err :=
		repositories.FindBusinessLocationByID(
			req.BusinessLocationID,
		)

	if err != nil {
		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"business location not found",
			)
	}

	if file != nil {
		imageURL, err := utils.SaveImage(file, "food")
		if err != nil {
			return dto.SurplusFoodDetailResponse{},
				err
		}
		req.ImageURL = imageURL
	}

	if location.Business.OwnerID != userID {
		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"unauthorized access",
			)
	}

	if req.DiscountPrice >
		req.OriginalPrice {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"discount price cannot exceed original price",
			)
	}

	food := models.SurplusFood{
		BusinessLocationID: req.BusinessLocationID,
		ImageURL:           req.ImageURL,
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

	food.Status =
		utils.GetFoodStatus(
			food.QuantityRemaining,
			food.ExpiryTime,
		)

	err = repositories.CreateSurplusFood(
		&food,
	)

	if err != nil {
		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"failed to create food",
			)
	}

	return mapSurplusFoodDetail(food), nil
}

func GetMerchantSurplusFoodDetail(
	userID string,
	foodID string,
) (
	dto.SurplusFoodDetailResponse,
	error,
) {

	food, err := repositories.FindMerchantFoodByID(userID, foodID)

	if err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"food not found",
			)
	}

	food.Status =
		utils.GetFoodStatus(
			food.QuantityRemaining,
			food.ExpiryTime,
		)

	_ =
		repositories.UpdateSurplusFood(
			&food,
		)

	return mapSurplusFoodDetail(food),
		nil
}

func UpdateMerchantSurplusFood(
	userID string,
	foodID string,
	req dto.UpdateSurplusFoodRequest,
) (
	dto.SurplusFoodDetailResponse,
	error,
) {

	food, err :=
		repositories.FindMerchantFoodByID(
			userID,
			foodID,
		)

	if err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"food not found",
			)
	}

	if req.DiscountPrice >
		req.OriginalPrice {

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

		diff :=
			req.QuantityAvailable -
				food.QuantityAvailable

		newRemaining :=
			food.QuantityRemaining + diff

		if newRemaining < 0 {
			newRemaining = 0
		}

		food.QuantityAvailable =
			req.QuantityAvailable

		food.QuantityRemaining =
			newRemaining
	}

	if !req.PickupStartTime.IsZero() {
		food.PickupStartTime =
			req.PickupStartTime
	}

	if !req.PickupEndTime.IsZero() {
		food.PickupEndTime =
			req.PickupEndTime
	}

	if !req.ExpiryTime.IsZero() {
		food.ExpiryTime =
			req.ExpiryTime
	}

	food.Status =
		utils.GetFoodStatus(
			food.QuantityRemaining,
			food.ExpiryTime,
		)

	err =
		repositories.UpdateSurplusFood(
			&food,
		)

	if err != nil {

		return dto.SurplusFoodDetailResponse{},
			errors.New(
				"failed to update food",
			)
	}

	return mapSurplusFoodDetail(food),
		nil
}

func DeleteMerchantSurplusFood(
	userID string,
	foodID string,
) error {

	food, err :=
		repositories.FindMerchantFoodByID(
			userID,
			foodID,
		)

	if err != nil {

		return errors.New(
			"food not found",
		)
	}

	err =
		repositories.DeleteSurplusFood(
			&food,
		)

	if err != nil {

		return errors.New(
			"failed to delete food",
		)
	}

	return nil
}
