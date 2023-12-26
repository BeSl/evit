package models

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
