package dto

import "time"

type MerchantFoodItem struct {
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	OriginalPrice     int       `json:"original_price"`
	DiscountPrice     int       `json:"discount_price"`
	QuantityRemaining int       `json:"quantity_remaining"`
	Status            string    `json:"status"`
	PickupStartTime   time.Time `json:"pickup_start_time"`
	PickupEndTime     time.Time `json:"pickup_end_time"`
	ExpiryTime        time.Time `json:"expiry_time"`
}

type MerchantDashboardResponse struct {
	TotalRevenue  int                `json:"total_revenue"`
	ActiveMenu    int                `json:"active_menu"`
	SoldMenu      int                `json:"sold_menu"`
	TotalDiscount int                `json:"total_discount"`
	AvailableMenu int                `json:"available_menu"`
	ExpiredMenu   int                `json:"expired_menu"`
	SurplusFoods  []MerchantFoodItem `json:"surplus_foods"`
}
