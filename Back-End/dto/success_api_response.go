package dto

type SuccessAPIResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}
