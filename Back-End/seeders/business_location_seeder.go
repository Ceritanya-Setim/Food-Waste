package seeders

import (
	"backend/models"
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

func BusinessLocationSeeder(db *gorm.DB) {
	var businesses []models.Business
	if err := db.Limit(5).Find(&businesses).Error; err != nil {
		log.Fatal("BusinessLocationSeeder: Failed to get business", err)
	}

	openingTime, _ := time.Parse("15:04", "08:00")
	closingTime, _ := time.Parse("15:04", "17:00")
	opening := openingTime.Format("15:04:05")
	closing := closingTime.Format("15:04:05")

	locations := []models.BusinessLocation{
		{
			BusinessID:  businesses[0].ID,
			Address:     "Jl. Sudirman No. 10",
			City:        "Jakarta",
			Province:    "DKI Jakarta",
			PostalCode:  "10220",
			Latitude:    -6.2088,
			Longitude:   106.8456,
			OpeningTime: opening,
			ClosingTime: closing,
		},
		{
			BusinessID:  businesses[1].ID,
			Address:     "Jl. Asia Afrika No. 15",
			City:        "Bandung",
			Province:    "Jawa Barat",
			PostalCode:  "40111",
			Latitude:    -6.9175,
			Longitude:   107.6191,
			OpeningTime: opening,
			ClosingTime: closing,
		},
		{
			BusinessID:  businesses[2].ID,
			Address:     "Jl. Pemuda No. 8",
			City:        "Surabaya",
			Province:    "Jawa Timur",
			PostalCode:  "60271",
			Latitude:    -7.2575,
			Longitude:   112.7521,
			OpeningTime: opening,
			ClosingTime: closing,
		},
		{
			BusinessID:  businesses[3].ID,
			Address:     "Jl. Malioboro No. 1",
			City:        "Yogyakarta",
			Province:    "DI Yogyakarta",
			PostalCode:  "55213",
			Latitude:    -7.7956,
			Longitude:   110.3695,
			OpeningTime: opening,
			ClosingTime: closing,
		},
		{
			BusinessID:  businesses[4].ID,
			Address:     "Jl. Hasanuddin No. 20",
			City:        "Makassar",
			Province:    "Sulawesi Selatan",
			PostalCode:  "90111",
			Latitude:    -5.1477,
			Longitude:   119.4327,
			OpeningTime: opening,
			ClosingTime: closing,
		},
	}

	for _, location := range locations {
		db.Create(&location)
	}

	fmt.Println("BusinessLocation seeder done")
}
