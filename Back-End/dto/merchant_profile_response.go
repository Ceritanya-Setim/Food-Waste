package dto

type MerchantProfileResponse struct {
	FullName    string `json:"full_name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`

	BusinessName string `json:"business_name"`
	Description  string `json:"description"`
	Category     string `json:"category"`

	Address     string  `json:"address"`
	City        string  `json:"city"`
	Province    string  `json:"province"`
	PostalCode  string  `json:"postal_code"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	OpeningTime string  `json:"opening_time"`
	ClosingTime string  `json:"closing_time"`
}
