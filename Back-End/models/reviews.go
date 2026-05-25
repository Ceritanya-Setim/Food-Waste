package models

type Reviews struct {
	BaseModel
	OrderID       string      `gorm:"type:uuid;not null"`
	Order         Order       `gorm:"foreignKey:OrderID;references:ID"`
	UserID        string      `gorm:"type:uuid;not null"`
	User          User        `gorm:"foreignKey:UserID;references:ID"`
	SurplusFoodID string      `gorm:"type:uuid;not null"`
	SurplusFood   SurplusFood `gorm:"foreignKey:SurplusFoodID;references:ID"`
	Rating        int         `gorm:"not null"`
	Comment       string      `gorm:"type:text"`
}
