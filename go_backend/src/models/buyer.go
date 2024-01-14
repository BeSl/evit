package models

import "time"

type WhishListUser struct {
	UserId    uint
	User      User `gorm:"foreignKey:UserId"`
	ProductId uint
	Product   Product `gorm:"foreignKey:ProductId"`
}

type CartUser struct {
	Id                 uint `json:"key"`
	UserId             uint
	User               User    `gorm:"foreignKey:UserId"`
	ProductId          uint    `json:"product_id"`
	ProductName        string  `json:"product_name" gorm:"-"`
	ProductDescription string  `json:"product_description" gorm:"-"`
	Price              float64 `json:"price" gorm:"-"`
	Product            Product `gorm:"foreignKey:ProductId"`
	CountProduct       int     `json:"count"`
}

type Order struct {
	Model
	UserId      uint `gorm:"foreignKey:ProductId"`
	User        User `gorm:"foreignKey:UserId"`
	DateCreated time.Time
	Status      int
	Sostav      []OrderSostav `gorm:"foreignKey:OrderId"`
}

func (o *Order) NumberOrders() string {
	return string(o.DateCreated.YearDay()) + "_" + string(o.Id)
}

type OrderSostav struct {
	Model
	OrderId   uint
	ProductId uint
	Product   Product `gorm:"foreignKey:ProductId"`
	Count     float64
	Price     float64
	Summa     float64
}
