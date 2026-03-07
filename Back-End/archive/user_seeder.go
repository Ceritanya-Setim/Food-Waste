package seeders

import (
	"backend/models"
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func hashPassword(password string) string {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("UserSeeder: Failed to hash password", err)
	}
	return string(hashed)
}

func UserSeeder(db *gorm.DB) {
	users := []models.User{
		{
			FullName:     "Andi Pratama",
			Email:        "andi@example.com",
			PhoneNumber:  "081234567890",
			PasswordHash: hashPassword("password123"),
			Role:         models.RoleBuyer,
			IsVerified:   true,
		},
		{
			FullName:     "Budi Santoso",
			Email:        "budi@example.com",
			PhoneNumber:  "081234567891",
			PasswordHash: hashPassword("password123"),
			Role:         models.RoleBuyer,
			IsVerified:   false,
		},
		{
			FullName:     "Citra Lestari",
			Email:        "citra@example.com",
			PhoneNumber:  "081234567892",
			PasswordHash: hashPassword("password123"),
			Role:         models.RoleBusinessOwner,
			IsVerified:   true,
		},
		{
			FullName:     "Dewa Saputra",
			Email:        "dewa@example.com",
			PhoneNumber:  "081234567893",
			PasswordHash: hashPassword("password123"),
			Role:         models.RoleBusinessOwner,
			IsVerified:   true,
		},
		{
			FullName:     "Eka Wijaya",
			Email:        "eka@example.com",
			PhoneNumber:  "081234567894",
			PasswordHash: hashPassword("password123"),
			Role:         models.RoleBuyer,
			IsVerified:   false,
		},
	}

	for _, user := range users {
		db.Create(&user)
	}

	fmt.Println("User seeder done")
}
