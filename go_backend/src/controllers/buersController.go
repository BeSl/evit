package controllers

import (
	"gotemplate/src/database"
	"gotemplate/src/middlewares"
	"gotemplate/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func AddWishList(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var user models.User

	database.DB.Where("id = ?", id).First(&user)
	idProduct, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	var product models.Product

	database.DB.Where("id = ?", idProduct).First(&product)

	var wsu models.WhishListUser
	// wsu.Product = product
	// wsu.User = user

	res := database.DB.Where("user_id = ? and product_id = ?", id, idProduct).First(&wsu)

	if res.RowsAffected == 0 {
		wsu.Product = product
		wsu.User = user
		database.DB.Model(&wsu).Create(&wsu)
	} else {
		database.DB.Model(&wsu).Where("user_id = ? and product_id = ?", id, idProduct).Delete(&wsu)
	}

	return c.JSON(fiber.Map{
		"result": "ok",
	})
}

func UserWishList(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var products []models.Product
	var wsu []models.WhishListUser
	if id != 0 {
		database.DB.Preload("Product").Where("user_id = ?", id).Find(&wsu)
		for _, v := range wsu {
			products = append(products, v.Product)
		}

	}

	return c.JSON(fiber.Map{
		"data": products,
	})
}

func AddUserCart(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	idProduct, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.SendString(err.Error())
	}

	var cart models.CartUser

	var user models.User
	user.Id = id

	var product models.Product
	product.Id = uint(idProduct)

	database.DB.Find(&user)
	database.DB.Find(&product)

	cart.Product = product
	cart.User = user

	database.DB.Model(&cart).Create(&cart)

	return c.JSON(fiber.Map{
		"result": "ok",
	})
}

func DelUserCart(c *fiber.Ctx) error {
	idCart, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.SendString(err.Error())
	}

	var cart models.CartUser
	cart.Id = uint(idCart)

	database.DB.Delete(&cart)

	return c.JSON(fiber.Map{
		"result": "ok",
	})
}

func UserCart(c *fiber.Ctx) error {
	var carts []models.CartUser
	id, _ := middlewares.GetUserId(c)
	var user models.User
	user.Id = id

	database.DB.Model(&models.CartUser{}).Preload("Product").Where("user_id = ?", id).Find(&carts)

	for i := range carts {
		carts[i].ProductName = carts[i].Product.Title
		carts[i].ProductId = carts[i].Product.Id
		carts[i].ProductDescription = carts[i].Product.Description
		carts[i].Price = carts[i].Product.PriceAction

	}

	return c.JSON(fiber.Map{
		"data": carts,
	})
}
