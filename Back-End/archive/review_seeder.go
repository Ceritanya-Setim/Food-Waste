package seeders

import (
	"backend/models"
	"fmt"
	"log"

	"gorm.io/gorm"
)

func ReviewSeeder(db *gorm.DB) {
	var orders []models.Order

	if err := db.
		Where("status = ?", models.OrderCompleted).
		Find(&orders).Error; err != nil {
		log.Fatal("ReviewSeeder: Failed to get order:", err)
		return
	}

	if len(orders) == 0 {
		log.Println("No completed orders found")
		return
	}

	comments := []string{
		"Makanannya enak banget!",
		"Packaging rapi dan bersih.",
		"Harga sesuai kualitas.",
		"Pickup cepat dan mudah.",
		"Akan beli lagi nanti!",
	}

	reviews := []models.Reviews{}

	for i, order := range orders {
		var location models.BusinessLocation
		if err := db.
			First(&location, "id = ?", order.BusinessLocationID).Error; err != nil {
			log.Println("Failed to get business location:", err)
			continue
		}

		review := models.Reviews{
			OrderID:    order.ID,
			UserID:     order.UserID,
			BusinessID: location.BusinessID,
			Rating:     5,
			Comment:    comments[i%len(comments)],
		}

		reviews = append(reviews, review)
	}

	if len(reviews) > 0 {
		if err := db.Create(&reviews).Error; err != nil {
			log.Println("Failed to seed reviews:", err)
			return
		}
	}

	fmt.Println("Review seeder done")
}
