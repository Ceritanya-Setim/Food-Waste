package services

import (
	"backend/dto"
	"backend/repositories"
)

func GetImpactService() (
	dto.ImpactResponse,
	error,
) {

	stats, err := repositories.GetImpactStats()

	if err != nil {

		return dto.ImpactResponse{},
			err
	}

	return dto.ImpactResponse{
		FoodsSaved:     stats.FoodsSaved,
		MoneySaved:     stats.MoneySaved,
		CompletedOrder: stats.CompletedOrder,
	}, nil
}
