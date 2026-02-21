package main

import (
	"backend/database"
	"backend/seeders"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

const dbURL = "postgres://cihuy:SE0425@localhost:5432/foodapp?sslmode=disable"

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Command: create | up | down | seed | version")
	}

	cmd := os.Args[1]

	switch cmd {
	case "create":
		if len(os.Args) < 3 {
			log.Fatal("Usage: go run migrate.go create migration_name")
		}
		createMigration(os.Args[2])
	case "up":
		runMigration("up")
	case "down":
		runMigration("down")
	case "version":
		showVersion()
	case "seed":
		seed()
	default:
		log.Fatal("Command unknown")
	}
}

func createMigration(name string) {
	timestamp := time.Now().Format("20060102150405")
	upFile := fmt.Sprintf("%s_%s.up.sql", timestamp, name)
	downFile := fmt.Sprintf("%s_%s.down.sql", timestamp, name)
	upPath := filepath.Join("migrations", upFile)
	downPath := filepath.Join("migrations", downFile)
	upContent := "CREATE TABLE"
	downContent := "DROP TABLE"

	if err := os.WriteFile(upPath, []byte(upContent), 0644); err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile(downPath, []byte(downContent), 0644); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Migration created:")
	fmt.Println(" ", upPath)
	fmt.Println(" ", downPath)

}

func runMigration(direction string) {
	m, err := migrate.New("file://migrations", dbURL)
	if err != nil {
		log.Fatal(err)
	}

	if direction == "up" {
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
		fmt.Println("Migrate success")
	}

	if direction == "down" {
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
		fmt.Println("Rollback success")
	}
}

func showVersion() {
	m, err := migrate.New("file://migrations", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	v, dirty, err := m.Version()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Version:", v, "Dirty:", dirty)
}

func seed() {
	database.Connect()
	db := database.DB
	seeders.UserSeeder(db)
	seeders.BusinessSeeder(db)
	seeders.BusinessLocationSeeder(db)
	seeders.SurplusFoodSeeder(db)
	seeders.FoodImageSeeder(db)
	seeders.OrderSeeder(db)
	seeders.OrderItemSeeder(db)
	seeders.PaymentSeeder(db)
	seeders.ReviewSeeder(db)
}
