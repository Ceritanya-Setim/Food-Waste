package models

import "time"

type FoodStatus string

const (
	StatusActive  FoodStatus = "active"
	StatusSoldOut FoodStatus = "sold_out"
	StatusExpired FoodStatus = "expired"
)

type SurplusFood struct {
	BaseModel
	BusinessLocationID string           `gorm:"type:uuid; not null"`
	BusinessLocation   BusinessLocation `gorm:"foregnKey:BusinessLocationID;reference:ID"`
	Title              string           `gorm:"type:varchar(255);not null"`
	Description        string           `gorm:"type:text"`
	OriginalPrice      int              `gorm:"not null"`
	DiscountPrice      int              `gorm:"not null"`
	QuantityAvailable  int              `gorm:"not null"`
	QuantityRemaining  int              `gorm:"not null"`
	PickupStartTime    time.Time        `gorm:"not null"`
	PickupEndTime      time.Time        `gorm:"not null"`
	ExpiryTime         time.Time        `gorm:"not null"`
	Status             FoodStatus       `gorm:"type:varchar(50);not null"`
}
