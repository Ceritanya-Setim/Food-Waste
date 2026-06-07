package repositories

import (
	"backend/database"
	"backend/models"
)

type ImpactStats struct {
	FoodsSaved     int
	MoneySaved     int
	CompletedOrder int
}

func GetImpactStats() (
	ImpactStats,
	error,
) {

	var stats ImpactStats

	if err := database.DB.
		Table("order_items").
		Select(`
			COALESCE(
				SUM(order_items.quantity),
				0
			)
		`).
		Joins(`
			JOIN orders
			ON orders.id = order_items.order_id
		`).
		Where(
			"orders.status = ?",
			models.OrderCompleted,
		).
		Scan(&stats.FoodsSaved).
		Error; err != nil {

		return ImpactStats{}, err
	}

	if err := database.DB.
		Table("order_items").
		Select(`
			COALESCE(
				SUM(
					(
						surplus_foods.original_price
						-
						order_items.price_per_item
					)
					*
					order_items.quantity
				),
				0
			)
		`).
		Joins(`
			JOIN orders
			ON orders.id = order_items.order_id
		`).
		Joins(`
			JOIN surplus_foods
			ON surplus_foods.id =
			order_items.surplus_food_id
		`).
		Where(
			"orders.status = ?",
			models.OrderCompleted,
		).
		Scan(&stats.MoneySaved).
		Error; err != nil {

		return ImpactStats{}, err
	}

	var completedOrders int64

	if err := database.DB.
		Table("orders").
		Where(
			"status = ?",
			models.OrderCompleted,
		).
		Count(&completedOrders).
		Error; err != nil {

		return ImpactStats{}, err
	}

	stats.CompletedOrder =
		int(completedOrders)

	return stats, nil
}
