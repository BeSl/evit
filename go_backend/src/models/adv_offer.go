package models

type AdvOffers struct {
	Model
	ProductId   uint    `json:"products"`
	Product     Product `json:"product" gorm:"foreignKey:ProductId"`
	BannerImage string  `json:"bannerimage"`
	Description string  `json:"description"`
	Active      bool    `json:"active"`
}

type AdversCategory struct {
	Model
	Name     string
	Image    string
	Products []Product `json:"products" gorm:"many2many:adv_products"`
}
