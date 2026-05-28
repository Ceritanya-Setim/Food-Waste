package dto

import "time"

type SurplusFoodResponse struct {
	Title         string    `json:"title"`
	Description   string    `json:"description"`
	OriginalPrice int       `json:"original_price"`
	DiscountPrice int       `json:"discount_price"`
	PickupEndTime time.Time `json:"pickup_end_time"`
	ExpiryTime    time.Time `json:"expiry_time"`
	Status        string    `json:"status"`
	BusinessName  string    `json:"business_name"`
	Category      string    `json:"category"`
	City          string    `json:"city"`
}
