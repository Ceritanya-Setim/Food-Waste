package dto

type LoginResponse struct {
	Role  string `json:"role"`
	Token string `json:"token"`
}
