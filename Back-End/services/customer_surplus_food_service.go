package services

import (
	"backend/dto"
	"backend/repositories"
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
