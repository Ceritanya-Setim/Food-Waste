package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"backend/utils"
	"errors"
	"time"
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
		err := utils.GetMerchantData(userID)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	if user.Role != models.RoleMerchant {

		return dto.MerchantDashboardResponse{},
			errors.New("only merchant can access this endpoint")
	}

	totalRevenue := getMerchantRevenue(business.ID)

	activeMenu := getActiveMenuCount(business.ID)

	soldMenu := getSoldMenuCount(business.ID)

	totalDiscount := getTotalDiscount(business.ID)

	availableMenu := getAvailableMenuCount(business.ID)

	expiredMenu := getExpiredMenuCount(business.ID)

	foods, err := getMerchantFoods(business.ID)

	if err != nil {
		return dto.MerchantDashboardResponse{}, err
	}

	response := dto.MerchantDashboardResponse{
		TotalRevenue:  totalRevenue,
		ActiveMenu:    activeMenu,
		SoldMenu:      soldMenu,
		TotalDiscount: totalDiscount,
		AvailableMenu: availableMenu,
		ExpiredMenu:   expiredMenu,
		SurplusFoods:  foods,
	}

	return response, nil
}

func getMerchantRevenue(
	businessID string,
) int {

	type RevenueResult struct {
		Total int
	}

	var result RevenueResult

	database.DB.
		Table("orders").
		Select("COALESCE(SUM(orders.total_price), 0) as total").
		Where("orders.status = ?", models.OrderCompleted).
		Where(`
			orders.business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Scan(&result)

	return result.Total
}

func getActiveMenuCount(
	businessID string,
) int {

	var count int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Where("status = ?", models.StatusActive).
		Count(&count)

	return int(count)
}

func getSoldMenuCount(
	businessID string,
) int {

	type SoldResult struct {
		Total int
	}

	var result SoldResult

	database.DB.
		Table("order_items").
		Select("COALESCE(SUM(order_items.quantity), 0) as total").
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id = order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id = surplus_foods.business_location_id
		`).
		Where("business_locations.business_id = ?", businessID).
		Scan(&result)

	return result.Total
}

func getTotalDiscount(
	businessID string,
) int {

	type DiscountResult struct {
		Total int
	}

	var result DiscountResult

	database.DB.
		Table("order_items").
		Select(`
			COALESCE(SUM(
				(
					surplus_foods.original_price -
					surplus_foods.discount_price
				) * order_items.quantity
			), 0) as total
		`).
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id = order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id = surplus_foods.business_location_id
		`).
		Where("business_locations.business_id = ?", businessID).
		Scan(&result)

	return result.Total
}

func getAvailableMenuCount(
	businessID string,
) int {

	var count int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Where("expiry_time > ?", time.Now()).
		Where("status != ?", models.StatusExpired).
		Count(&count)

	return int(count)
}

func getExpiredMenuCount(
	businessID string,
) int {

	var count int64

	database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Where(`
			expiry_time <= ?
			OR status = ?
		`,
			time.Now(),
			models.StatusExpired,
		).
		Count(&count)

	return int(count)
}

func getMerchantFoods(
	businessID string,
) (
	[]dto.MerchantFoodItem,
	error,
) {

	var foods []models.SurplusFood

	if err := database.DB.
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Order("created_at DESC").
		Find(&foods).Error; err != nil {

		return nil, err
	}

	foodResponses := make(
		[]dto.MerchantFoodItem,
		0,
		len(foods),
	)

	for _, food := range foods {

		shortDescription := utils.TruncateWords(
			food.Description,
			10,
		)

		foodResponses = append(
			foodResponses,
			dto.MerchantFoodItem{
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

	return foodResponses, nil
}
