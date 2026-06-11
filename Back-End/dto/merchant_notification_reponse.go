package dto

import "time"

type MerchantNotificationResponse struct {
	OrderID      string    `json:"id"`
	CustomerName string    `json:"name"`
	TotalPrice   int       `json:"total_price"`
	PickupCode   string    `json:"pickup_code"`
	OrderTime    time.Time `json:"order_time"`
	Status       string    `json:"status"`
}
