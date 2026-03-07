package seeders

import (
	"backend/models"
	"fmt"
	"log"

	"gorm.io/gorm"
)

func BusinessSeeder(db *gorm.DB) {
	var users []models.User
	if err := db.Limit(5).Find(&users).Error; err != nil {
		log.Fatal("BusinessSeeder: Failed to get users", err)
	}

	businesses := []models.Business{
		{
			OwnerID:      users[0].ID,
			BusinessName: "Andi's Coffee",
			Description:  "Cozy coffee shop with a modern vibe",
			Category:     "Cafe",
			LogoURL:      "https://example.com/logo1.png",
			IsVerified:   true,
		},
		{
			OwnerID:      users[1].ID,
			BusinessName: "Budi Bakery",
			Description:  "Freshly baked bread and pastries",
			Category:     "Other",
			LogoURL:      "https://example.com/logo2.png",
			IsVerified:   false,
		},
		{
			OwnerID:      users[2].ID,
			BusinessName: "Citra Restaurant",
			Description:  "Authentic local cuisine with modern touch",
			Category:     "Restaurant",
			LogoURL:      "https://example.com/logo3.png",
			IsVerified:   true,
		},
		{
			OwnerID:      users[3].ID,
			BusinessName: "Dewa Hotel",
			Description:  "Comfortable stay with great service",
			Category:     "Hotel",
			LogoURL:      "https://example.com/logo4.png",
			IsVerified:   true,
		},
		{
			OwnerID:      users[4].ID,
			BusinessName: "Eka's Eatery",
			Description:  "Casual dining with tasty local dishes",
			Category:     "Other",
			LogoURL:      "https://example.com/logo5.png",
			IsVerified:   false,
		},
	}

	for _, business := range businesses {
		db.Create(&business)
	}

	fmt.Println("Business seeder done")
}
