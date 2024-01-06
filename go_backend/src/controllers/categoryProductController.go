package controllers

import (
	"gotemplate/src/database"
	"gotemplate/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Categories(c *fiber.Ctx) error {
	var categorys []models.CategoryProduct

	database.DB.Where("active=", true).Find(&categorys)

	return c.JSON(categorys)
}

func NewCategory(c *fiber.Ctx) error {
	var category models.CategoryProduct

	if err := c.BodyParser(&category); err != nil {
		return err
	}

	if category.ExtId.String() == "" {
		return fiber.NewError(427, "Пустой внешний ИД")
	}

	if category.ParrentExtID.String() != "" && category.ParrentExtID.String() != "00000000-0000-0000-0000-000000000000" {
		var parrentCategory models.CategoryProduct
		database.DB.Where("ext_id = ?", category.ParrentExtID.String()).Find(&parrentCategory)
		if parrentCategory.Id == 0 {
			return fiber.NewError(428, "Нет родителя с таким ИД")
		} else {
			category.ParrentCategory = &parrentCategory
		}
	}

	database.DB.Create(&category)

	return c.JSON(category)
}

func ProductFromCategory(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	var category models.CategoryProduct

	category.Id = uint(id)

	database.DB.Find(&category)

	return c.JSON(category.Products)
}
