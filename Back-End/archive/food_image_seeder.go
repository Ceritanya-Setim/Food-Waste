package seeders

import (
	"backend/models"
	"fmt"
	"log"

	"gorm.io/gorm"
)

func FoodImageSeeder(db *gorm.DB) {
	var surplusFood []models.SurplusFood
	if err := db.Limit(5).Find(&surplusFood).Error; err != nil {
		log.Fatal("FoodImageSeeder: Failed to get surplus food", err)
	}

	foodImages := []models.FoodImage{
		{
			SurplusFoodID: surplusFood[0].ID,
			ImageURL:      "https://images.unsplash.com/photo-1509440159596-0249088772ff",
		},
		{
			SurplusFoodID: surplusFood[1].ID,
			ImageURL:      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
		},
		{
			SurplusFoodID: surplusFood[2].ID,
			ImageURL:      "https://images.unsplash.com/photo-1604908176997-431ff0f9d9b3",
		},
		{
			SurplusFoodID: surplusFood[3].ID,
			ImageURL:      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
		},
		{
			SurplusFoodID: surplusFood[4].ID,
			ImageURL:      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
		},
	}

	for _, foodImage := range foodImages {
		db.Create(&foodImage)
	}

	fmt.Println("FoodImage seeder done")
}
