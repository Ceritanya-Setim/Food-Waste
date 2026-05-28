package dto

type OrderResponse struct {
	OrderID    string `json:"order_id"`
	PickupCode string `json:"pickup_code"`
	TotalPrice int    `json:"total_price"`
	Status     string `json:"status"`
	TotalItems int    `json:"total_items"`
}
