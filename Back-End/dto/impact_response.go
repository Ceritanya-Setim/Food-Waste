package dto

type ImpactResponse struct {
	FoodsSaved     int `json:"foods_saved"`
	MoneySaved     int `json:"money_saved"`
	CompletedOrder int `json:"completed_orders"`
}
