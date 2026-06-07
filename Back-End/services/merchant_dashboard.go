package services

import (
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"backend/utils"
	"errors"
)

func GetMerchantDashboardService(
	userID string,
) (
	dto.MerchantDashboardResponse,
	error,
) {

	user,
		business,
		_,
		err := repositories.GetMerchantData(userID)

	if err != nil {

		return dto.MerchantDashboardResponse{},
			err
	}

	if user.Role != models.RoleMerchant {

		return dto.MerchantDashboardResponse{},
			errors.New(
				"only merchant can access this endpoint",
			)
	}

	revenue, err :=
		repositories.GetMerchantRevenue(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	activeMenu, err :=
		repositories.GetActiveMenuCount(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	soldMenu, err :=
		repositories.GetSoldMenuCount(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	discount, err :=
		repositories.GetTotalDiscount(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	availableMenu, err :=
		repositories.GetAvailableMenuCount(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	expiredMenu, err :=
		repositories.GetExpiredMenuCount(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	foods, err :=
		repositories.GetMerchantFoods(
			business.ID,
		)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	foodResponses := make(
		[]dto.MerchantFoodItem,
		0,
		len(foods),
	)

	for _, food := range foods {

		shortDescription :=
			utils.TruncateWords(
				food.Description,
				10,
			)

		foodResponses = append(
			foodResponses,
			dto.MerchantFoodItem{
				ID:                food.ID,
				ImageURL:          food.ImageURL,
				Name:              food.Title,
				Description:       shortDescription,
				OriginalPrice:     food.OriginalPrice,
				DiscountPrice:     food.DiscountPrice,
				QuantityRemaining: food.QuantityRemaining,
				Status:            string(food.Status),
				PickupStartTime:   food.PickupStartTime,
				PickupEndTime:     food.PickupEndTime,
				ExpiryTime:        food.ExpiryTime,
			},
		)
	}

	return dto.MerchantDashboardResponse{
		TotalRevenue:  revenue,
		ActiveMenu:    activeMenu,
		SoldMenu:      soldMenu,
		TotalDiscount: discount,
		AvailableMenu: availableMenu,
		ExpiredMenu:   expiredMenu,
		SurplusFoods:  foodResponses,
	}, nil
}
