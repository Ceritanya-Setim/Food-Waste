package models

import "time"

type OrderStatus string

const (
	OrderPending   OrderStatus = "pending"
	OrderPaid      OrderStatus = "paid"
	OrderCompleted OrderStatus = "completed"
	OrderCancelled OrderStatus = "cancelled"
	OrderExpired   OrderStatus = "expired"
)

type Order struct {
	BaseModel
	UserID             string           `gorm:"type:uuid; not null"`
	User               User             `gorm:"foreignKey:UserID; references:ID"`
	BusinessLocationID string           `gorm:"type:uuid; not null"`
	BusinessLocation   BusinessLocation `gorm:"foreignKey:BusinessLocationID; references:ID"`
	TotalPrice         int              `gorm:"not null"`
	Status             OrderStatus      `gorm:"type:varchar(50);not null"`
	PickupCode         string           `gorm:"type:varchar(100);unique;not null"`
	OrderTime          time.Time        `gorm:"not null"`
	PickupTime         time.Time        `gorm:"not null"`
}
