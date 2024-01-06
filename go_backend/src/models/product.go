package models

import "github.com/google/uuid"

type Product struct {
	Model
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Price       float64 `json:"price"`
}

type ProductDetail struct {
	Model
	ParentProduct Product `gorm:"embedded"`
	Title         string
	Size          int32
	Price         float64
}

type ValueProperty struct {
	Model
	Product  ProductDetail `gorm:"embedded"`
	isMain   bool
	Property Property `gorm:"embedded"`
	Value    string
}

type Property struct {
	Model
	Title      string
	IsSearch   bool
	ParentProp uint
}

type CollectionProduct struct {
	Model
	CollectionId     uint
	Name             string
	BagesUrl         string
	Product          []Product          `json:"products" gorm:"many2many:collection_products"`
	ParentCollection *CollectionProduct `json:"parrent_collection" gorm:"foreignKey:CollectionId"`
}

type CategoryProduct struct {
	Model
	ExtId  uuid.UUID `json:"uid"`
	Name   string    `json:"name"`
	Link   string    `json:"refer"`
	Active bool      `json:"-"`

	ParrentCategory   *CategoryProduct `json:"parrent_category" gorm:"-"`
	ParrentExtID      uuid.UUID        `json:"parrent_uid"`
	ParrentCategoryID uint

	Products []Product `json:"products" gorm:"many2many:collection_products"`
}
