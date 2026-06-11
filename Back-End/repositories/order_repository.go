package repositories

import (
	"backend/database"
	"backend/models"
	"time"

	"gorm.io/gorm"
)

type OrderHistoryStats struct {
	TotalOrders     int
	CompletedOrders int
	TotalSpending   int
}

type OrderHistoryRow struct {
	OrderID      string
	BusinessName string
	PickupCode   string
	Status       string
	OrderDate    time.Time
	TotalPrice   int
}

func BeginTransaction() *gorm.DB {
	return database.DB.Begin()
}

func GetOrderHistoryStats(
	userID string,
) (
	OrderHistoryStats,
	error,
) {

	var stats OrderHistoryStats

	var totalOrders int64

	if err := database.DB.
		Model(&models.Order{}).
		Where(
			"user_id = ?",
			userID,
		).
		Count(&totalOrders).
		Error; err != nil {

		return OrderHistoryStats{},
			err
	}

	var completedOrders int64

	if err := database.DB.
		Model(&models.Order{}).
		Where(
			"user_id = ?",
			userID,
		).
		Where(
			"status = ?",
			models.OrderCompleted,
		).
		Count(&completedOrders).
		Error; err != nil {

		return OrderHistoryStats{},
			err
	}

	type SpendingResult struct {
		Total int
	}

	var spending SpendingResult

	if err := database.DB.
		Model(&models.Order{}).
		Select(`
			COALESCE(
				SUM(total_price),
				0
			) as total
		`).
		Where(
			"user_id = ?",
			userID,
		).
		Where(
			"status = ?",
			models.OrderPaid,
		).
		Scan(&spending).
		Error; err != nil {

		return OrderHistoryStats{},
			err
	}

	stats.TotalOrders =
		int(totalOrders)

	stats.CompletedOrders =
		int(completedOrders)

	stats.TotalSpending =
		spending.Total

	return stats, nil
}

func GetOrderHistoryRows(
	userID string,
	status string,
) (
	[]OrderHistoryRow,
	error,
) {

	var rows []OrderHistoryRow

	query := database.DB.
		Table("orders").
		Select(`
			orders.id as order_id,
			businesses.business_name,
			orders.pickup_code as pickup_code,
			orders.status,
			orders.order_time as order_date,
			orders.total_price
		`).
		Joins(`
			JOIN business_locations
			ON business_locations.id =
			orders.business_location_id
		`).
		Joins(`
			JOIN businesses
			ON businesses.id =
			business_locations.business_id
		`).
		Where(
			"orders.user_id = ?",
			userID,
		)

	if status != "" &&
		status != "all" {

		query = query.Where(
			"orders.status = ?",
			status,
		)
	}

	err := query.
		Order(
			"orders.order_time DESC",
		).
		Scan(&rows).
		Error

	return rows, err
}

func FindSurplusFoodByID(
	tx *gorm.DB,
	foodID string,
) (
	models.SurplusFood,
	error,
) {

	var food models.SurplusFood

	err := tx.
		Where("id = ?", foodID).
		First(&food).
		Error

	return food, err
}

func CreateOrder(
	tx *gorm.DB,
	order *models.Order,
) error {

	return tx.Create(order).Error
}

func CreateOrderItems(
	tx *gorm.DB,
	items *[]models.OrderItem,
) error {

	return tx.Create(items).Error
}

type MerchantNotificationRow struct {
	OrderID      string
	CustomerName string
	TotalPrice   int
	PickupCode   string
	OrderTime    time.Time
	Status       string
}

func GetNotificationsByMerchantOwner(
	merchantID string,
) (
	[]MerchantNotificationRow,
	error,
) {

	var notifications []MerchantNotificationRow

	err := database.DB.Table("orders o").
		Select(`
			o.id AS order_id, 
			u.full_name AS customer_name, 
			o.total_price, 
			o.pickup_code, 
			o.order_time, 
			o.status
		`).
		Joins("JOIN users u ON o.user_id = u.id").
		Joins("JOIN business_locations bl ON o.business_location_id = bl.id").
		Joins("JOIN businesses b ON bl.business_id = b.id").
		Where("b.owner_id = ?", merchantID).
		Order("o.order_time DESC").
		Scan(&notifications).Error

	if err != nil {
		return nil, err
	}

	return notifications, nil
}
