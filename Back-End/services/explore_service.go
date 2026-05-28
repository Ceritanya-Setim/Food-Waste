package services

import (
	"backend/database"
	"backend/dto"
	"backend/models"
	"fmt"
)

func GetExploreData() (
	dto.ExploreResponse,
	error,
) {

	type PickupResult struct {
		AvgHour float64
	}

	var pickup PickupResult

	if err := database.DB.
		Table("surplus_foods").
		Select(`
			COALESCE(
				AVG(EXTRACT(HOUR FROM pickup_start_time)),
				0
			) as avg_hour
		`).
		Scan(&pickup).Error; err != nil {

		return dto.ExploreResponse{}, err
	}

	type DiscountResult struct {
		AvgDiscount float64
	}

	var discount DiscountResult

	if err := database.DB.
		Table("surplus_foods").
		Select(`
			COALESCE(
				AVG(original_price - discount_price),
				0
			) as avg_discount
		`).
		Scan(&discount).Error; err != nil {

		return dto.ExploreResponse{}, err
	}

	type CategoryResult struct {
		Category string
		Total    int
	}

	var category CategoryResult

	if err := database.DB.
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
		Scan(&category).Error; err != nil {

		return dto.ExploreResponse{}, err
	}

	type FoodResult struct {
		Name           string
		Category       string
		OriginalPrice  int
		DiscountPrice  int
		TotalPurchased int
	}

	var foods []FoodResult

	if err := database.DB.
		Table("order_items").
		Select(`
			surplus_foods.title as name,
			businesses.category,
			surplus_foods.original_price,
			surplus_foods.discount_price,
			COALESCE(SUM(order_items.quantity), 0)
			as total_purchased
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
		Where(`
			orders.status IN ?
		`, []models.OrderStatus{
			models.OrderPaid,
			models.OrderCompleted,
		}).
		Group(`
			surplus_foods.id,
			businesses.category
		`).
		Order("total_purchased DESC").
		Limit(10).
		Scan(&foods).Error; err != nil {

		return dto.ExploreResponse{}, err
	}

	topFoods := make(
		[]dto.ExploreFoodItem,
		0,
		len(foods),
	)

	for _, food := range foods {

		topFoods = append(topFoods,
			dto.ExploreFoodItem{
				Name:           food.Name,
				Category:       food.Category,
				OriginalPrice:  food.OriginalPrice,
				DiscountPrice:  food.DiscountPrice,
				TotalPurchased: food.TotalPurchased,
			},
		)
	}

	response := dto.ExploreResponse{
		Summary: dto.ExploreSummary{
			AveragePickupHour: fmt.Sprintf(
				"%02d:00",
				int(pickup.AvgHour),
			),
			AverageDiscount: int(discount.AvgDiscount),
			TopCategory:     category.Category,
		},
		TopFoods: topFoods,
	}

	return response, nil
}
