package models

import "github.com/google/uuid"

type Product struct {
	Model
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	Image         string  `json:"image"`
	Price         float64 `json:"price"`
	PriceAction   float64 `json:"price_action"`
	WhishListUser bool    `json:"wishlist_user"`
	HotSale       bool    `json:"hotsale"`
	Ostatok       int     `json:"min_ost" gorm:"-"`
	ExdID         string  `json:"ext_id"`
}

type RemainsProduct struct {
	Product Product
	Count   int
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
	Active bool      `json:"active"`

	ParentCategory      *CategoryProduct `json:"child_category" gorm:"-"`
	ParentCategoryExtID uuid.UUID        `json:"parent_uid"`

	Products []Product `json:"products" gorm:"many2many:collectionId_products"`
}

type DataCategorySite struct {
	Key      string        `json:"key"`
	Name     string        `json:"label"`
	Children []ChildrenCat `json:"children"`
}

type ChildrenCat struct {
	Key  string `json:"key"`
	Name string `json:"label"`
}

type DataCat struct {
	Parent   string `json:"parent"`
	Category string `json:"child"`
	Chid     string
	Id       string
}
