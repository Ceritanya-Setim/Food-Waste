package dto

type EditProfileRequest struct {
	FullName        string `json:"full_name"`
	Email           string `json:"email"`
	PhoneNumber     string `json:"phone_number"`
	Role            string `json:"role"`
	Password        string `json:"password"`
	ProfileImageURL string `json:"profile_image_url"`
}
