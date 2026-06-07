package repositories

import (
	"backend/database"
	"backend/models"
)

type PickupResult struct {
	AvgHour float64
}

type DiscountResult struct {
	AvgDiscount float64
}

type CategoryResult struct {
	Category string
	Total    int
}

type FoodResult struct {
	Name           string
	Category       string
	OriginalPrice  int
	DiscountPrice  int
	TotalPurchased int
}

func GetAveragePickupHour() (
	PickupResult,
	error,
) {

	var result PickupResult

	err := database.DB.
		Table("surplus_foods").
		Select(`
			COALESCE(
				AVG(EXTRACT(HOUR FROM pickup_start_time)),
				0
			) as avg_hour
		`).
		Scan(&result).
		Error

	return result, err
}

func GetAverageDiscount() (
	DiscountResult,
	error,
) {

	var result DiscountResult

	err := database.DB.
		Table("surplus_foods").
		Select(`
			COALESCE(
				AVG(
					original_price -
					discount_price
				),
				0
			) as avg_discount
		`).
		Scan(&result).
		Error

	return result, err
}

func GetTopCategory() (
	CategoryResult,
	error,
) {

	var result CategoryResult

	err := database.DB.
		Table("surplus_foods").
		Select(`
			businesses.category,
			COUNT(*) as total
		`).
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
		Group("businesses.category").
		Order("total DESC").
		Limit(1).
		Scan(&result).
		Error

	return result, err
}

func GetTopFoods() (
	[]FoodResult,
	error,
) {

	var foods []FoodResult

	err := database.DB.
		Table("order_items").
		Select(`
			surplus_foods.title as name,
			businesses.category,
			surplus_foods.original_price,
			surplus_foods.discount_price,
			COALESCE(
				SUM(order_items.quantity),
				0
			) as total_purchased
		`).
		Joins(`
			JOIN orders
			ON orders.id =
			order_items.order_id
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
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Where(
			"orders.status IN ?",
			[]models.OrderStatus{
				models.OrderPaid,
				models.OrderCompleted,
			},
		).
		Group(`
			surplus_foods.id,
			businesses.category
		`).
		Order("total_purchased DESC").
		Limit(10).
		Scan(&foods).
		Error

	return foods, err
}
