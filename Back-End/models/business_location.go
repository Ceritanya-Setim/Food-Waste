package models

type BusinessLocation struct {
	BaseModel
	BusinessID  string   `gorm:"type:uuid;not null; index"`
	Business    Business `gorm:"foreignKey:BusinessID;references:ID"`
	Address     string   `gorm:"type:text;not null"`
	City        string   `gorm:"type:varchar(100); not null"`
	Province    string   `gorm:"type:varchar(100); not null"`
	PostalCode  string   `gorm:"type:varchar(20)"`
	Latitude    float64  `gorm:"type:double precision; not null"`
	Longitude   float64  `gorm:"type:double precision; not null"`
	OpeningTime string   `gorm:"type:time; not null"`
	ClosingTime string   `gorm:"type:time; not null"`
}
