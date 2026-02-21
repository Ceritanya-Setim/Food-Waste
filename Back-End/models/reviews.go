package models

type Reviews struct {
	BaseModel
	OrderID    string   `gorm:"type:uuid;not null"`
	Order      Order    `gorm:"foreignKey:OrderID;references:ID"`
	UserID     string   `gorm:"type:uuid;not null"`
	User       User     `gorm:"foreignKey:UserID;references:ID"`
	BusinessID string   `gorm:"type:uuid;not null"`
	Business   Business `gorm:"foreignKey:BusinessID;references:ID"`
	Rating     int      `gorm:"not null"`
	Comment    string   `gorm:"type:text"`
}
