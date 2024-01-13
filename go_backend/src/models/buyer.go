package models

type WhishListUser struct {
	UserId    uint
	User      User `gorm:"foreignKey:UserId"`
	ProductId uint
	Product   Product `gorm:"foreignKey:ProductId"`
}

type CartUser struct {
	Model
	UserId       uint
	User         User
	ProductId    uint
	Product      Product
	CountProduct int
}
