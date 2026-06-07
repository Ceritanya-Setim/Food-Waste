package dto

type UpdateMerchantProfileRequest struct {
	FullName        string `form:"full_name"`
	Email           string `form:"email"`
	PhoneNumber     string `form:"phone_number"`
	Password        string `form:"password"`
	ProfileImageURL string `form:"-" json:"-"`

	BusinessName string `form:"business_name"`
	Description  string `form:"description"`
	Category     string `form:"category"`

	Address     string  `form:"address"`
	City        string  `form:"city"`
	Province    string  `form:"province"`
	PostalCode  string  `form:"postal_code"`
	Latitude    float64 `form:"latitude"`
	Longitude   float64 `form:"longitude"`
	OpeningTime string  `form:"opening_time"`
	ClosingTime string  `form:"closing_time"`
}
