package seeders

import (
	"backend/models"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func OrderSeeder(db *gorm.DB) {
	var user []models.User
	if err := db.Limit(5).Find(&user).Error; err != nil {
		log.Fatal("OrderSeeder: Failed to get user", err)
	}

	var businessLocation []models.BusinessLocation
	if err := db.Limit(5).Find(&businessLocation).Error; err != nil {
		log.Fatal("OrderSeeder: Failed to get business location", err)
	}

	now := time.Now()

	orders := []models.Order{
		{
			UserID:             user[0].ID,
			BusinessLocationID: businessLocation[0].ID,
			TotalPrice:         15000,
			Status:             models.OrderPending,
			PickupCode:         uuid.NewString(),
			OrderTime:          now.Add(-30 * time.Minute),
			PickupTime:         now.Add(1 * time.Hour),
		},
		{
			UserID:             user[1].ID,
			BusinessLocationID: businessLocation[1].ID,
			TotalPrice:         25000,
			Status:             models.OrderPaid,
			PickupCode:         uuid.NewString(),
			OrderTime:          now.Add(-2 * time.Hour),
			PickupTime:         now.Add(2 * time.Hour),
		},
		{
			UserID:             user[2].ID,
			BusinessLocationID: businessLocation[2].ID,
			TotalPrice:         12000,
			Status:             models.OrderCompleted,
			PickupCode:         uuid.NewString(),
			OrderTime:          now.Add(-5 * time.Hour),
			PickupTime:         now.Add(-2 * time.Hour),
		}, {
			UserID:             user[3].ID,
			BusinessLocationID: businessLocation[3].ID,
			TotalPrice:         10000,
			Status:             models.OrderCancelled,
			PickupCode:         uuid.NewString(),
			OrderTime:          now.Add(-3 * time.Hour),
			PickupTime:         now.Add(1 * time.Hour),
		},
		{
			UserID:             user[4].ID,
			BusinessLocationID: businessLocation[4].ID,
			TotalPrice:         20000,
			Status:             models.OrderExpired,
			PickupCode:         uuid.NewString(),
			OrderTime:          now.Add(-10 * time.Hour),
			PickupTime:         now.Add(-6 * time.Hour),
		},
	}

	for _, order := range orders {
		db.Create(&order)
	}
	fmt.Println("Order seeder done")

}
