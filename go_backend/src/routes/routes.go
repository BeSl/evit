package routes

import (
	"gotemplate/src/controllers"
	"gotemplate/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

//pub
//adm
//usr

func Setup(app *fiber.App) {
	api := app.Group("api")
	setAdminRoute(api)
	setAmbassadorRoute(api)
	setADVRouter(api)
	setCategory(api)
}

func setADVRouter(api fiber.Router) {
	adv := api.Group("adv")
	adv.Post("/offers", controllers.CreateAdvOffer)
	adv.Get("/offers", controllers.ActiveAdvers)

}

func setCategory(api fiber.Router) {
	cat := api.Group("category")
	cat.Get("all", controllers.Categories)
	cat.Get("products/:id", controllers.ProductFromCategory)

	catauth := cat.Use(middlewares.IsAuthenticated)
	catauth.Post("new", controllers.NewCategory)

}

func setAdminRoute(api fiber.Router) {

	admin := api.Group("admin")
	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)

	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("user", controllers.User)
	adminAuthenticated.Post("logout", controllers.Logout)
	adminAuthenticated.Put("users/info", controllers.UpdateInfo)
	adminAuthenticated.Put("users/password", controllers.UpdatePassword)
	adminAuthenticated.Get("ambassadors", controllers.Ambassadors)
	adminAuthenticated.Get("products", controllers.Products)
	adminAuthenticated.Post("products", controllers.CreateProducts)
	adminAuthenticated.Get("products/:id", controllers.GetProduct)
	adminAuthenticated.Put("products/:id", controllers.UpdateProduct)
	adminAuthenticated.Delete("products/:id", controllers.DeleteProduct)

	adminAuthenticated.Post("newcontacts", controllers.UpdateContact)
	adminAuthenticated.Post("fillcategory/:id", controllers.FillCategoryProduct)
}

func setAmbassadorRoute(api fiber.Router) {
	ambassador := api.Group("ambassador")
	ambassador.Post("register", controllers.Register)
	ambassador.Post("login", controllers.Login)
	ambassador.Get("products/frontend", controllers.ProductsFrontend)
	ambassador.Get("products/backend", controllers.ProductsBackend)
	ambassador.Get("products/:id", controllers.GetProduct)
	ambassador.Get("categories", controllers.Categories)
	ambassador.Get("productscat/:id", controllers.ProductFromCategory)
	ambassador.Get("banners", controllers.ActiveAdvers)
	ambassador.Get("productstest", controllers.TestAdvOffer)
	ambassador.Get("contacts", controllers.Contacts)
	ambassador.Get("actions", controllers.AdvPages)
	ambassador.Post("addwishlist/:id", controllers.AddWishList)
	ambassador.Get("userwislist", controllers.UserWishList)

	ambassador.Get("cart", controllers.UserCart)
	ambassador.Post("cart/:id", controllers.AddUserCart)
	ambassador.Delete("cart/:id", controllers.DelUserCart)

	ambassadorAuthenticated := ambassador.Use(middlewares.IsAuthenticated)
	ambassadorAuthenticated.Get("user", controllers.User)
	ambassadorAuthenticated.Post("logout", controllers.Logout)
	ambassadorAuthenticated.Put("users/info", controllers.UpdateInfo)
	ambassadorAuthenticated.Put("users/password", controllers.UpdatePassword)
	ambassadorAuthenticated.Put("users/contacts", controllers.UpdateContactInfo)
	ambassadorAuthenticated.Post("neworder", controllers.NewOrder)
}
