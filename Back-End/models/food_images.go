package models

type FoodImage struct {
	BaseModel
	SurplusFoodID string      `gorm:"type:uuid; not null"`
	SurplusFood   SurplusFood `gorm:"foreignKey:SurplusFoodID;reference:ID"`
	ImageURL      string      `gorm:"type:text; not null"`
}
