package repositories

import (
	"backend/database"
	"backend/models"
	"time"
)

func GetMerchantData(
	userID string,
) (
	models.User,
	models.Business,
	models.BusinessLocation,
	error,
) {

	var user models.User

	if err := database.DB.
		Where("id = ?", userID).
		First(&user).Error; err != nil {

		return user,
			models.Business{},
			models.BusinessLocation{},
			err
	}

	var business models.Business

	if err := database.DB.
		Where("owner_id = ?", userID).
		First(&business).Error; err != nil {

		return user,
			business,
			models.BusinessLocation{},
			err
	}

	var location models.BusinessLocation

	if err := database.DB.
		Where("business_id = ?", business.ID).
		First(&location).Error; err != nil {

		return user,
			business,
			location,
			err
	}

	return user,
		business,
		location,
		nil
}

func GetMerchantRevenue(
	businessID string,
) (int, error) {

	type Result struct {
		Total int
	}

	var result Result

	err := database.DB.
		Table("orders").
		Select(`
			COALESCE(
				SUM(orders.total_price),
				0
			) as total
		`).
		Where(
			"orders.status = ?",
			models.OrderCompleted,
		).
		Where(`
			orders.business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Scan(&result).
		Error

	return result.Total, err
}

func GetActiveMenuCount(
	businessID string,
) (int, error) {

	var count int64

	err := database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Where(
			"status = ?",
			models.StatusActive,
		).
		Count(&count).
		Error

	return int(count), err
}

func GetSoldMenuCount(
	businessID string,
) (int, error) {

	type Result struct {
		Total int
	}

	var result Result

	err := database.DB.
		Table("order_items").
		Select(`
			COALESCE(
				SUM(order_items.quantity),
				0
			) as total
		`).
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id =
			order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Where(
			"business_locations.business_id = ?",
			businessID,
		).
		Scan(&result).
		Error

	return result.Total, err
}

func GetTotalDiscount(
	businessID string,
) (int, error) {

	type Result struct {
		Total int
	}

	var result Result

	err := database.DB.
		Table("order_items").
		Select(`
			COALESCE(
				SUM(
					(
						surplus_foods.original_price
						-
						surplus_foods.discount_price
					)
					*
					order_items.quantity
				),
				0
			) as total
		`).
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id =
			order_items.surplus_food_id
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			surplus_foods.business_location_id
		`).
		Where(
			"business_locations.business_id = ?",
			businessID,
		).
		Scan(&result).
		Error

	return result.Total, err
}

func GetAvailableMenuCount(
	businessID string,
) (int, error) {

	var count int64

	err := database.DB.
		Model(&models.SurplusFood{}).
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Where(
			"expiry_time > ?",
			time.Now(),
		).
		Where(
			"status != ?",
			models.StatusExpired,
		).
		Count(&count).
		Error

	return int(count), err
}

func GetExpiredMenuCount(
	businessID string,
) (int, error) {

	var count int64

	err := database.DB.
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
		Count(&count).
		Error

	return int(count), err
}

func GetMerchantFoods(
	businessID string,
) (
	[]models.SurplusFood,
	error,
) {

	var foods []models.SurplusFood

	err := database.DB.
		Where(`
			business_location_id IN (
				SELECT id
				FROM business_locations
				WHERE business_id = ?
			)
		`, businessID).
		Order("created_at DESC").
		Find(&foods).
		Error

	return foods, err
}

func FindMerchantFoodByID(
	userID string,
	foodID string,
) (
	models.SurplusFood,
	error,
) {

	var food models.SurplusFood

	err := database.DB.
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
		Where(
			"businesses.owner_id = ?",
			userID,
		).
		Where(
			"surplus_foods.id = ?",
			foodID,
		).
		First(&food).
		Error

	return food, err
}
