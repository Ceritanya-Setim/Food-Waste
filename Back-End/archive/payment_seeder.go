package seeders

import (
	"backend/models"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func PaymentSeeder(db *gorm.DB) {
	var orders []models.Order

	if err := db.Limit(5).Find(&orders).Error; err != nil {
		log.Fatal("PaymentSeeder: Failure to get order", err)
	}

	payments := []models.Payments{}

	methods := []models.PaymentMethod{
		models.MethodGopay,
		models.MethodDana,
		models.MethodBankTransfer,
	}

	statuses := []models.PaymentStatus{
		models.StatusPending,
		models.StatusSuccess,
		models.StatusFailed,
	}

	for i, order := range orders {
		method := methods[i%len(methods)]
		status := statuses[i%len(statuses)]

		payment := models.Payments{
			OrderID:              order.ID,
			PaymentMethod:        method,
			PaymentStatus:        status,
			TransactionReference: "TRX-" + uuid.New().String(),
		}

		if status == models.StatusSuccess {
			payment.PaidAt = time.Now()
		}

		payments = append(payments, payment)
	}

	if err := db.Create(&payments).Error; err != nil {
		log.Println("Failed to seed payments:", err)
		return
	}

	fmt.Println("Payment seeder done")
}
