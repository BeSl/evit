package database

import (
	"gotemplate/src/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	dsn := "host=192.168.1.119 user=root password=root dbname=ambassador port=54322"
	// DB, err = gorm.Open(mysql.Open("root:root@tcp(192.168.1.119:33066)/ambassador"), &gorm.Config{})
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Could not connect with the database!")

	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{},
		models.Product{},
		models.Property{},
		models.ProductDetail{},
		models.ValueProperty{},
		models.AdvOffers{},
		models.AdversCategory{},
		models.CategoryProduct{},
		models.ContactOrgInfo{},
		models.WhishListUser{},
		models.CartUser{},
		models.OrderSostav{},
		models.Order{},
	)
}
