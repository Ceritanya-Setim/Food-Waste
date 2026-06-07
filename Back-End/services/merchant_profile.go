package services

import (
	"backend/dto"
	"backend/repositories"
	"backend/utils"
	"errors"
)

func GetMerchantProfileService(
	userID string,
) (
	dto.MerchantProfileResponse,
	error,
) {

	user,
		business,
		location,
		err := repositories.GetMerchantData(userID)

	if err != nil {

		return dto.MerchantProfileResponse{},
			err
	}

	return dto.MerchantProfileResponse{
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,

		BusinessName: business.BusinessName,
		Description:  business.Description,
		Category:     string(business.Category),

		Address:     location.Address,
		City:        location.City,
		Province:    location.Province,
		PostalCode:  location.PostalCode,
		Latitude:    location.Latitude,
		Longitude:   location.Longitude,
		OpeningTime: location.OpeningTime,
		ClosingTime: location.ClosingTime,
	}, nil
}

func UpdateMerchantProfileService(
	userID string,
	req dto.UpdateMerchantProfileRequest,
) (
	dto.MerchantProfileResponse,
	error,
) {

	user,
		business,
		location,
		err := repositories.GetMerchantData(userID)

	if err != nil {

		return dto.MerchantProfileResponse{},
			err
	}

	// CHECK EMAIL

	if req.Email != "" &&
		req.Email != user.Email {

		exists, err :=
			repositories.CheckEmailExists(
				req.Email,
			)

		if err != nil {

			return dto.MerchantProfileResponse{},
				err
		}

		if exists {

			return dto.MerchantProfileResponse{},
				errors.New(
					"email already used",
				)
		}
	}

	// USER UPDATE

	userUpdates := map[string]interface{}{}

	if req.FullName != "" {
		userUpdates["full_name"] =
			req.FullName
	}

	if req.Email != "" {
		userUpdates["email"] =
			req.Email
	}

	if req.PhoneNumber != "" {
		userUpdates["phone_number"] =
			req.PhoneNumber
	}

	if req.Password != "" {

		hash, err :=
			utils.HashPassword(
				req.Password,
			)

		if err != nil {

			return dto.MerchantProfileResponse{},
				errors.New(
					"failed to hash password",
				)
		}

		userUpdates["password_hash"] =
			hash
	}

	if len(userUpdates) > 0 {

		err :=
			repositories.UpdateUser(
				&user,
				userUpdates,
			)

		if err != nil {

			return dto.MerchantProfileResponse{},
				errors.New(
					"failed to update user",
				)
		}
	}

	// BUSINESS UPDATE

	businessUpdates := map[string]interface{}{}

	if req.BusinessName != "" {
		businessUpdates["business_name"] =
			req.BusinessName
	}

	if req.Description != "" {
		businessUpdates["description"] =
			req.Description
	}

	if req.Category != "" {
		businessUpdates["category"] =
			req.Category
	}

	if len(businessUpdates) > 0 {

		err :=
			repositories.UpdateBusiness(
				&business,
				businessUpdates,
			)

		if err != nil {

			return dto.MerchantProfileResponse{},
				errors.New(
					"failed to update business",
				)
		}
	}

	// LOCATION UPDATE

	locationUpdates := map[string]interface{}{}

	if req.Address != "" {
		locationUpdates["address"] =
			req.Address
	}

	if req.City != "" {
		locationUpdates["city"] =
			req.City
	}

	if req.Province != "" {
		locationUpdates["province"] =
			req.Province
	}

	if req.PostalCode != "" {
		locationUpdates["postal_code"] =
			req.PostalCode
	}

	if req.Latitude != 0 {
		locationUpdates["latitude"] =
			req.Latitude
	}

	if req.Longitude != 0 {
		locationUpdates["longitude"] =
			req.Longitude
	}

	if req.OpeningTime != "" {
		locationUpdates["opening_time"] =
			req.OpeningTime
	}

	if req.ClosingTime != "" {
		locationUpdates["closing_time"] =
			req.ClosingTime
	}

	if len(locationUpdates) > 0 {

		err :=
			repositories.UpdateBusinessLocation(
				&location,
				locationUpdates,
			)

		if err != nil {

			return dto.MerchantProfileResponse{},
				errors.New(
					"failed to update location",
				)
		}
	}

	return GetMerchantProfileService(
		userID,
	)
}
