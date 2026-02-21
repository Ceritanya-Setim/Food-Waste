package models

type OrderItem struct {
	BaseModel
	OrderID       string      `gorm:"type:uuid;not null"`
	Order         Order       `gorm:"foreignKey:OrderID;references:ID"`
	SurplusFoodID string      `gorm:"type:uuid;not null"`
	SurplusFood   SurplusFood `gorm:"foreignKey:SurplusFoodID;references:ID"`
	Quantity      int         `gorm:"not null"`
	PricePerItem  int         `gorm:"not null"`
	Subtotal      int         `gorm:"not null"`
}
