package controllers

import (
	"gotemplate/src/database"
	"gotemplate/src/models"

	"github.com/gofiber/fiber/v2"
)

func CreateAdvOffer(c *fiber.Ctx) error {
	var adv models.AdvOffers

	if err := c.BodyParser(&adv); err != nil {
		return err
	}

	database.DB.Create(&adv)

	return c.JSON(adv)
}
