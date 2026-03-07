package models

type UserRole string

const (
	RoleCustomer UserRole = "customer"
	RoleMerchant UserRole = "merchant"
)

type User struct {
	BaseModel
	FullName        string   `gorm:"type:varchar(100);not null"`
	Email           string   `gorm:"type:varchar(100);uniqueIndex;not null"`
	PhoneNumber     string   `gorm:"type:varchar(20)"`
	PasswordHash    string   `gorm:"type:text;not null"`
	Role            UserRole `gorm:"type:varchar(100);default:customer;not null"`
	ProfileImageURL string   `gorm:"type:text"`
	IsVerified      bool     `gorm:"default:false"`
}
