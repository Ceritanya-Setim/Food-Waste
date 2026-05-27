package dto

type OrderItemRequest struct {
	SurplusFoodID string `json:"surplus_food_id" binding:"required"`
	Quantity      int    `json:"quantity" binding:"required,min=1"`
}

type OrderRequest struct {
	BusinessLocationID string             `json:"business_location_id" binding:"required"`
	Items              []OrderItemRequest `json:"items" binding:"required,min=1"`
}
