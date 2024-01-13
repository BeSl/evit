package controllers

import (
	"context"
	"encoding/json"
	"gotemplate/src/database"
	"gotemplate/src/middlewares"
	"gotemplate/src/models"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Products(c *fiber.Ctx) error {
	var products []models.Product

	database.DB.Find(&products)

	return c.JSON(products)
}

func CreateProducts(c *fiber.Ctx) error {
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return err
	}

	database.DB.Create(&product)

	go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func GetProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var product models.Product

	product.Id = uint(id)

	database.DB.Find(&product)

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	product := models.Product{}
	product.Id = uint(id)

	if err := c.BodyParser(&product); err != nil {
		return err
	}
	database.DB.Model(&product).Where("exd_id=?", product.ExdID).Select("*").Updates(&product)

	// go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	product := models.Product{}
	product.Id = uint(id)

	database.DB.Delete(&product)

	go database.ClearCache("products_frontend", "products_backend")

	return nil
}

func ProductsFrontend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()

	// result, err := database.Cache.Get(ctx, "products_frontend").Result()
	_, err := database.Cache.Get(ctx, "products_frontend").Result()

	// if err != nil {
	database.DB.Find(&products)

	bytes, err := json.Marshal(products)

	if err != nil {
		panic(err)
	}

	if errKey := database.Cache.Set(ctx, "products_frontend", bytes, 30*time.Minute).Err(); errKey != nil {
		panic(errKey)
	}
	// } else {
	// json.Unmarshal([]byte(result), &products)
	// }

	return c.JSON(products)
}

func ProductsBackend(c *fiber.Ctx) error {
	var products []models.Product
	// var ctx = context.Background()

	// result, err := database.Cache.Get(ctx, "products_backend").Result()

	// if err != nil {
	database.DB.Find(&products)

	//bytes, err := json.Marshal(products)
	//if err != nil {
	//	panic(err)
	//}

	// 	database.Cache.Set(ctx, "products_backend", bytes, 30*time.Minute)
	// } else {
	// 	json.Unmarshal([]byte(result), &products)
	// }

	var searchedProducts []models.Product

	if s := c.Query("s"); s != "" {
		lower := strings.ToLower(s)
		for _, product := range products {
			if strings.Contains(strings.ToLower(product.Title), lower) || strings.Contains(strings.ToLower(product.Description), lower) {
				searchedProducts = append(searchedProducts, product)
			}
		}
	} else {
		searchedProducts = products
	}

	if sortParam := c.Query("sort"); sortParam != "" {
		sortLower := strings.ToLower(sortParam)
		if sortLower == "asc" {
			sort.Slice(searchedProducts, func(i, j int) bool {
				return searchedProducts[i].Price < searchedProducts[j].Price
			})
		} else if sortLower == "desc" {
			sort.Slice(searchedProducts, func(i, j int) bool {
				return searchedProducts[i].Price > searchedProducts[j].Price
			})
		}
	}

	var total = len(searchedProducts)
	page, _ := strconv.Atoi(c.Query("page", "1"))
	perPage := 12

	idUser, _ := middlewares.GetUserId(c)
	var user models.User

	if idUser != 0 {
		database.DB.Where("id = ?", idUser).First(&user)

	}

	for i := range searchedProducts {
		if len(searchedProducts[i].Description) > 100 {
			searchedProducts[i].Description = searchedProducts[i].Description[0:100] + "..."
		}

		if idUser != 0 {
			var WSU models.WhishListUser
			res := database.DB.Model(&WSU).Where("user_id = ? and product_id = ?", idUser, searchedProducts[i].Id).First(&WSU).RowsAffected
			if res != 0 {
				searchedProducts[i].WhishListUser = true
			}
		}
	}

	var data []models.Product

	if total <= page*perPage && total >= (page-1)*perPage {
		data = searchedProducts[(page-1)*perPage : total]
	} else if total >= page*perPage {
		data = searchedProducts[(page-1)*perPage : page*perPage]
	} else {
		data = []models.Product{}
	}

	return c.JSON(fiber.Map{
		"data": data,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": total/perPage + 1,
		},
	})
}

func ActiveAdvers(c *fiber.Ctx) error {
	var advers []models.AdvOffers

	database.DB.Limit(5).Where("Active= ?", true).Find(&advers)

	return c.JSON(fiber.Map{
		"data": advers,
	})

}

func ProductsCollection(c *fiber.Ctx) error {
	var product []models.Product
	idCollection, _ := strconv.Atoi(c.Params("id"))
	database.DB.Where("id=?", idCollection).First(&product)

	return c.JSON(fiber.Map{
		"data": product,
	})

}
