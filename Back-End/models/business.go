package models

type BusinessCategory string

const (
	CategoryAsianFood  BusinessCategory = "asian_food"
	CategoryCafe       BusinessCategory = "cafe"
	CategoryRestaurant BusinessCategory = "restaurant"
	CategoryHotel      BusinessCategory = "hotel"
	CategoryOther      BusinessCategory = "other"
)

type Business struct {
	BaseModel
	OwnerID      string           `gorm:"type:uuid;not null"`
	Owner        User             `gorm:"foreignKey:OwnerID;references:ID"`
	BusinessName string           `gorm:"type:varchar(100); not null"`
	Description  string           `gorm:"type:text"`
	Category     BusinessCategory `gorm:"type:varchar(100); not null"`
	LogoURL      string           `gorm:"type:text"`
	IsVerified   bool             `gorm:"default:false"`
}
