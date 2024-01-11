package controllers

import (
	"gotemplate/src/database"
	"gotemplate/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Categories(c *fiber.Ctx) error {
	query := `with level1 as (
		select distinct 
			cp.ext_id ,
			cp.id, 
			cp.name 
		from category_products cp 
		where  cp.parent_category_ext_id ='00000000-0000-0000-0000-000000000000'
	)
	select 
		lev1.name parent,
		lev1.id id,
		coalesce(cp.name ,'') category,
		cast(coalesce(cp.id,0) as text) chid
	from level1 lev1
		left join category_products cp 
		on lev1.ext_id = cp.parent_category_ext_id ;`
	// var parrentId []string

	rows, err := database.DB.Raw(query).Rows()
	defer rows.Close()
	if err != nil {
		return fiber.NewError(429, err.Error())
	}

	var dc []models.DataCategorySite
	var curdata models.DataCat
	find := false
	for rows.Next() {
		database.DB.ScanRows(rows, &curdata)
		for i, v := range dc {
			if v.Name == curdata.Parent {
				find = true
				dc[i].Children = append(dc[i].Children, models.ChildrenCat{Key: curdata.Chid, Name: curdata.Category})
			}
		}
		if find == false {

			if curdata.Category != "" {
				child := models.ChildrenCat{}
				child.Name = curdata.Category
				child.Key = curdata.Chid
				dc = append(dc, models.DataCategorySite{
					Key:      curdata.Id,
					Name:     curdata.Parent,
					Children: []models.ChildrenCat{child}})
			} else {
				dc = append(dc, models.DataCategorySite{
					Key:  curdata.Id,
					Name: curdata.Parent,
				})

			}

		}
		find = false
	}
	return c.JSON(dc)
}

func NewCategory(c *fiber.Ctx) error {
	var category models.CategoryProduct

	if err := c.BodyParser(&category); err != nil {
		return err
	}

	if category.ExtId.String() == "" {
		return fiber.NewError(427, "Пустой внешний ИД")
	}

	if category.ParentCategoryExtID.String() != "" && category.ParentCategoryExtID.String() != "00000000-0000-0000-0000-000000000000" {
		var parrentCategory models.CategoryProduct
		database.DB.Where("ext_id = ?", category.ParentCategoryExtID.String()).Find(&parrentCategory)
		if parrentCategory.Id == 0 {
			return fiber.NewError(428, "Нет родителя с таким ИД")
		} else {
			category.ParentCategory = &parrentCategory
		}
	}

	database.DB.Create(&category)

	return c.JSON(category)
}

func ProductFromCategory(c *fiber.Ctx) error {
	idCategory, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	category := models.CategoryProduct{}
	category.Id = uint(idCategory)

	database.DB.Model(&category).Find(&category)

	return c.JSON(fiber.Map{
		"data": category.Products,
	})
}

type ExtID struct {
	Id string
}

func FillCategoryProduct(c *fiber.Ctx) error {
	extiDCategory := c.Params("id")

	var listId []ExtID

	if err := c.BodyParser(&listId); err != nil {
		return err
	}
	//prodExtId := c.Params("id"))

	var category models.CategoryProduct

	database.DB.Where("ext_id=?", extiDCategory).Find(&category)

	for _, v := range listId {
		var tprod models.Product
		database.DB.Where("ext_id=?", v.Id).Find(&tprod)

		category.Products = append(category.Products, tprod)

	}
	if category.Id == 0 {
		return fiber.NewError(430, "Нет запрошенной категории")
	}

	return c.JSON(nil)
}
