package seeders

import (
	"backend/models"
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

func SurplusFoodSeeder(db *gorm.DB) {
	var location []models.BusinessLocation
	if err := db.Limit(5).Find(&location).Error; err != nil {
		log.Fatal("SurplusFoodSeeder: Failed to get business location", err)
	}

	surplusFoods := []models.SurplusFood{
		{
			BusinessLocationID: location[0].ID,
			Title:              "Paket Roti Sisa Hari Ini",
			Description:        "Berisi 5 roti campur (manis & asin)",
			OriginalPrice:      50000,
			DiscountPrice:      10000,
			QuantityAvailable:  10,
			QuantityRemaining:  10,
			PickupStartTime:    time.Now().Add(2 * time.Hour),
			PickupEndTime:      time.Now().Add(5 * time.Hour),
			ExpiryTime:         time.Now().Add(8 * time.Hour),
			Status:             "active",
		},
		{
			BusinessLocationID: location[1].ID,
			Title:              "Buffet Hotel Surplus",
			Description:        "Makanan buffet sisa layak konsumsi",
			OriginalPrice:      50000,
			DiscountPrice:      10000,
			QuantityAvailable:  10,
			QuantityRemaining:  10,
			PickupStartTime:    time.Now().Add(2 * time.Hour),
			PickupEndTime:      time.Now().Add(5 * time.Hour),
			ExpiryTime:         time.Now().Add(8 * time.Hour),
			Status:             "active",
		},
		{
			BusinessLocationID: location[2].ID,
			Title:              "Nasi Box Restoran",
			Description:        "Nasi ayam + sayur",
			OriginalPrice:      50000,
			DiscountPrice:      10000,
			QuantityAvailable:  10,
			QuantityRemaining:  10,
			PickupStartTime:    time.Now().Add(2 * time.Hour),
			PickupEndTime:      time.Now().Add(5 * time.Hour),
			ExpiryTime:         time.Now().Add(8 * time.Hour),
			Status:             "active",
		},
		{
			BusinessLocationID: location[3].ID,
			Title:              "Paket Kopi & Pastry",
			Description:        "1 kopi + 1 pastry random",
			OriginalPrice:      50000,
			DiscountPrice:      10000,
			QuantityAvailable:  10,
			QuantityRemaining:  10,
			PickupStartTime:    time.Now().Add(2 * time.Hour),
			PickupEndTime:      time.Now().Add(5 * time.Hour),
			ExpiryTime:         time.Now().Add(8 * time.Hour),
			Status:             "active",
		},
		{
			BusinessLocationID: location[4].ID,
			Title:              "Dessert Box Surprise",
			Description:        "Dessert mix 3 item",
			OriginalPrice:      50000,
			DiscountPrice:      10000,
			QuantityAvailable:  10,
			QuantityRemaining:  10,
			PickupStartTime:    time.Now().Add(2 * time.Hour),
			PickupEndTime:      time.Now().Add(5 * time.Hour),
			ExpiryTime:         time.Now().Add(8 * time.Hour),
			Status:             "active",
		},
	}

	for _, surplusFood := range surplusFoods {
		db.Create(&surplusFood)
	}

	fmt.Println("SurplusFood seeder done")
}
