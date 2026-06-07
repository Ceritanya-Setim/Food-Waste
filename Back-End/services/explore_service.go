package services

import (
	"backend/dto"
	"backend/repositories"
	"fmt"
)

func GetExploreData() (
	dto.ExploreResponse,
	error,
) {

	pickup, err := repositories.GetAveragePickupHour()

	if err != nil {
		return dto.ExploreResponse{}, err
	}

	discount, err := repositories.GetAverageDiscount()

	if err != nil {
		return dto.ExploreResponse{}, err
	}

	category, err := repositories.GetTopCategory()

	if err != nil {
		return dto.ExploreResponse{}, err
	}

	foods, err := repositories.GetTopFoods()

	if err != nil {
		return dto.ExploreResponse{}, err
	}

	topFoods := make(
		[]dto.ExploreFoodItem,
		0,
		len(foods),
	)

	for _, food := range foods {

		topFoods = append(
			topFoods,
			dto.ExploreFoodItem{
				ID:             food.ID,
				ImageURL:       food.ImageURL,
				Name:           food.Name,
				Category:       food.Category,
				OriginalPrice:  food.OriginalPrice,
				DiscountPrice:  food.DiscountPrice,
				TotalPurchased: food.TotalPurchased,
			},
		)
	}

	return dto.ExploreResponse{
		Summary: dto.ExploreSummary{
			AveragePickupHour: fmt.Sprintf(
				"%02d:00",
				int(pickup.AvgHour),
			),
			AverageDiscount: int(
				discount.AvgDiscount,
			),
			TopCategory: category.Category,
		},
		TopFoods: topFoods,
	}, nil
}
