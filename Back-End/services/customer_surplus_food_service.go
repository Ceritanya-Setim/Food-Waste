package services

import (
	"backend/dto"
	"backend/repositories"
	"backend/utils"
	"errors"
)

func GetSurplusFoods(
	req dto.SurplusFoodRequest,
) ([]dto.SurplusFoodResponse, error) {

	foods, err :=
		repositories.FindSurplusFoods(req)

	if err != nil {

		return nil,
			errors.New(
				"failed to fetch surplus foods",
			)
	}

	response := make(
		[]dto.SurplusFoodResponse,
		0,
		len(foods),
	)

	for _, food := range foods {

		response = append(
			response,
			mapSurplusFoodResponse(food),
		)
	}

	return response, nil
}

func GetFoodDetailService(foodID string, userLat float64, userLon float64) (dto.FoodDetailResponse, error) {
	food, err := repositories.GetFoodWithLocation(foodID)
	if err != nil {
		return dto.FoodDetailResponse{}, err
	}

	reviews, err := repositories.GetReviewsByFoodID(foodID)
	if err != nil {
		return dto.FoodDetailResponse{}, err
	}

	var distancePtr *float64

	if userLat != 0 && userLon != 0 {
		dist := utils.CalculateDistance(
			userLat, userLon,
			food.BusinessLocation.Latitude, food.BusinessLocation.Longitude,
		)
		distancePtr = &dist
	}

	totalReviewers := len(reviews)
	var sumRating int
	var avgRating float64

	var reviewResponses []dto.ReviewResponse
	for _, rev := range reviews {
		sumRating += rev.Rating

		reviewResponses = append(reviewResponses, dto.ReviewResponse{
			ReviewerName: rev.User.FullName,
			Rating:       rev.Rating,
			Comment:      rev.Comment,
		})
	}

	if totalReviewers > 0 {
		avgRating = float64(sumRating) / float64(totalReviewers)
	}

	response := dto.FoodDetailResponse{
		SurplusFoodName:   food.Title,
		BusinessName:      food.BusinessLocation.Business.BusinessName,
		DistanceKM:        distancePtr,
		OriginalPrice:     food.OriginalPrice,
		DiscountPrice:     food.DiscountPrice,
		QuantityRemaining: food.QuantityRemaining,
		Latitude:          food.BusinessLocation.Latitude,
		Longitude:         food.BusinessLocation.Longitude,
		TotalReviewers:    totalReviewers,
		AverageRating:     avgRating,
		Reviews:           reviewResponses,
	}

	return response, nil
}
