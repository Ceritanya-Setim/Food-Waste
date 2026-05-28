package dto

type ExploreFoodItem struct {
	Name           string `json:"name"`
	Category       string `json:"category"`
	OriginalPrice  int    `json:"original_price"`
	DiscountPrice  int    `json:"discount_price"`
	TotalPurchased int    `json:"total_purchased"`
}

type ExploreSummary struct {
	AveragePickupHour string `json:"average_pickup_hour"`
	AverageDiscount   int    `json:"average_discount"`
	TopCategory       string `json:"top_category"`
}

type ExploreResponse struct {
	Summary  ExploreSummary    `json:"summary"`
	TopFoods []ExploreFoodItem `json:"top_foods"`
}
