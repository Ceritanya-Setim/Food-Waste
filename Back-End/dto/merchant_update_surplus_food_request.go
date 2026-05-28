package dto

import "time"

type UpdateSurplusFoodRequest struct {
	Title             string    `json:"title"`
	Description       string    `json:"description"`
	OriginalPrice     int       `json:"original_price"`
	DiscountPrice     int       `json:"discount_price"`
	QuantityAvailable int       `json:"quantity_available"`
	PickupStartTime   time.Time `json:"pickup_start_time"`
	PickupEndTime     time.Time `json:"pickup_end_time"`
	ExpiryTime        time.Time `json:"expiry_time"`
}
