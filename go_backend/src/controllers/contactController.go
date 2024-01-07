package controllers

import (
	"gotemplate/src/database"
	"gotemplate/src/models"

	"github.com/gofiber/fiber/v2"
)

const defaultName = "myorg"

func Contacts(c *fiber.Ctx) error {

	var contact models.ContactOrgInfo
	contact.Name = defaultName
	database.DB.Model(&contact).Find(&contact)
	return c.SendString(contact.DataDivKit)
	// return c.JSON(fiber.Map{
	// 	"data": ex,
	// })
}

func UpdateContact(c *fiber.Ctx) error {
	result := false
	newText := string(c.Body())
	contacts := models.ContactOrgInfo{
		Name: defaultName,
	}

	database.DB.Find(&contacts)
	contacts.DataDivKit = newText

	if contacts.Id != 0 {
		database.DB.Model(&contacts).Updates(&contacts)
	} else {
		database.DB.Create(&contacts)
	}

	return c.JSON(fiber.Map{
		"success": result,
	})
}
