package dto

type RegisterRequest struct {
	FullName     string `json:"full_name" binding:"required"`
	Email        string `json:"email" binding:"required"`
	PhoneNumber  string `json:"phone_number" binding:"required"`
	Role         string `json:"role" binding:"required"`
	PasswordHash string `json:"password" binding:"required,min=6"`
}
