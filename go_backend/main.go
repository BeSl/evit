package main

import (
	"gotemplate/src/database"
	"gotemplate/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()
	database.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChannel()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		// AllowOrigins:     "",
		AllowHeaders: "X-Requested-With, content-type, Accept, Accept-Language, Content-Language, Content-Type",
		AllowOriginsFunc: func(origin string) bool {
			return true
		},
	}))
	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins:     "http://localhost:3000",
	// 	AllowMethods:     "GET,POST,HEAD,OPTIONS,PUT,DELETE,PATCH",
	// 	AllowHeaders:     "Origin, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,X-Requested-With",
	// 	ExposeHeaders:    "Origin",
	// 	AllowCredentials: true,
	// 	// AllowOriginsFunc: func(origin string) bool {
	// 	// 	// return os.Getenv("ENVIRONMENT") == "development"
	// 	// 	return true
	// 	// },
	// }))

	routes.Setup(app)

	app.Listen(":8000")
}
