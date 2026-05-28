package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
)

func GetImpactService() (dto.ImpactResponse, error) {

	var foodsSaved int
	var moneySaved int
	var completedOrders int64

	if err := database.DB.
		Table("order_items").
		Select("COALESCE(SUM(order_items.quantity), 0)").
		Joins("JOIN orders ON orders.id = order_items.order_id").
		Where("orders.status = ?", models.OrderCompleted).
		Scan(&foodsSaved).Error; err != nil {

		return dto.ImpactResponse{}, err
	}

	if err := database.DB.
		Table("order_items").
		Select(`
			COALESCE(SUM(
				(surplus_foods.original_price - order_items.price_per_item)
				* order_items.quantity
			), 0)
		`).
		Joins("JOIN orders ON orders.id = order_items.order_id").
		Joins("JOIN surplus_foods ON surplus_foods.id = order_items.surplus_food_id").
		Where("orders.status = ?", models.OrderCompleted).
		Scan(&moneySaved).Error; err != nil {

		return dto.ImpactResponse{}, err
	}

	if err := database.DB.
		Table("orders").
		Where("status = ?", models.OrderCompleted).
		Count(&completedOrders).Error; err != nil {

		return dto.ImpactResponse{}, err
	}

	response := dto.ImpactResponse{
		FoodsSaved:     foodsSaved,
		MoneySaved:     moneySaved,
		CompletedOrder: int(completedOrders),
	}

	return response, nil
}
