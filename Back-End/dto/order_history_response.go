package dto

import "time"

type OrderHistoryItem struct {
	OrderID      string    `json:"order_id"`
	BusinessName string    `json:"business_name"`
	Status       string    `json:"status"`
	OrderDate    time.Time `json:"order_date"`
	TotalPrice   int       `json:"total_price"`
}

type OrderHistorySummary struct {
	TotalOrders     int `json:"total_orders"`
	CompletedOrders int `json:"completed_orders"`
	TotalSpending   int `json:"total_spending"`
}

type OrderHistoryResponse struct {
	Summary OrderHistorySummary `json:"summary"`
	Orders  []OrderHistoryItem  `json:"orders"`
}
