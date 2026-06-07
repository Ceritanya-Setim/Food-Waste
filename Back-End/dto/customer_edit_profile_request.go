package dto

type EditProfileRequest struct {
	FullName    string `form:"full_name"`
	Email       string `form:"email"`
	PhoneNumber string `form:"phone_number"`
	Role        string `form:"role"`
	Password    string `form:"password"`

	ProfileImageURL string `form:"-" json:"-"`
}
