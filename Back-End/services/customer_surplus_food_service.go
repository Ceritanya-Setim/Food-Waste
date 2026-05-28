package services

import (
	"backend/dto"
	"backend/models"
	"backend/utils"
	"errors"
)

func GetSurplusFoods(
	req dto.SurplusFoodRequest,
) ([]dto.SurplusFoodResponse, error) {

	var foods []models.SurplusFood

	query := utils.BuildSurplusFoodQuery(req)

	if err := query.Find(&foods).Error; err != nil {

		return nil,
			errors.New("failed to fetch surplus foods")
	}

	response := make(
		[]dto.SurplusFoodResponse,
		0,
		len(foods),
	)

	for _, food := range foods {

		response = append(
			response,
			utils.MapSurplusFoodResponse(food),
		)
	}

	return response, nil
}
