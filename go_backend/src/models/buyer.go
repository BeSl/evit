package models

type WhishListUser struct {
	UserId    uint
	User      User `gorm:"foreignKey:UserId"`
	ProductId uint
	Product   Product `gorm:"foreignKey:ProductId"`
}

type CartUser struct {
	Model
	UserId             uint
	User               User    `gorm:"foreignKey:UserId"`
	ProductId          uint    `json:"product_id"`
	ProductName        string  `json:"product_name" gorm:"-"`
	ProductDescription string  `json:"product_description" gorm:"-"`
	Price              float64 `json:"price" gorm:"-"`
	Product            Product `gorm:"foreignKey:ProductId"`
	CountProduct       int     `json:"count"`
}
