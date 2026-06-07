package dto

import "time"

type CreateSurplusFoodRequest struct {
	BusinessLocationID string    `form:"business_location_id"`
	ImageURL           string    `form:"-" json:"-"`
	Title              string    `form:"title"`
	Description        string    `form:"description"`
	OriginalPrice      int       `form:"original_price"`
	DiscountPrice      int       `form:"discount_price"`
	QuantityAvailable  int       `form:"quantity_available"`
	PickupStartTime    time.Time `form:"pickup_start_time"`
	PickupEndTime      time.Time `form:"pickup_end_time"`
	ExpiryTime         time.Time `form:"expiry_time"`
}
