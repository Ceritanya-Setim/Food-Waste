package dto

type UserProfileResponse struct {
	FullName        string `json:"full_name"`
	Email           string `json:"email"`
	PhoneNumber     string `json:"phone_number"`
	Role            string `json:"role"`
	ProfileImageURL string `json:"profile_image_url"`
	RegisteredSince string `json:"registered_since"`
	LastUpdated     string `json:"last_updated"`
}
