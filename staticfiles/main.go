package main

import (
	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/v2/log"
)

func main() {
	app := fiber.New()
	log.SetLevel(log.LevelDebug)
	app.Static("/", "./public")

	app.Listen(":3030")
}
