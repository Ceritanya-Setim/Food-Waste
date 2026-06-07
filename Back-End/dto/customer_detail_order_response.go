package dto

type ReviewResponse struct {
	ReviewerName string `json:"reviewer_name"`
	ReviewDate   string `json:"reviewer_date"`
	Rating       int    `json:"rating"`
	Comment      string `json:"comment"`
}

type FoodDetailResponse struct {
	SurplusFoodName   string           `json:"surplus_food_name"`
	BusinessName      string           `json:"business_name"`
	DistanceKM        *float64         `json:"distance_km", omitempty`
	OriginalPrice     int              `json:"original_price"`
	DiscountPrice     int              `json:"discount_price"`
	QuantityRemaining int              `json:"quantity_remaining"`
	Latitude          float64          `json:"latitude"`
	Longitude         float64          `json:"longitude"`
	TotalReviewers    int              `json:"total_reviewer"`
	AverageRating     float64          `json:"average_rating"`
	Reviews           []ReviewResponse `json:"reviews"`
}
