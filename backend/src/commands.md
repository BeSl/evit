https://qaa-engineer.ru/ispolzovanie-golang-dlya-raboty-s-openapi/	
установка swagger
go get -u github.com/go-swagger/go-swagger/cmd/swagger  

пустой OpenAPI-документ
swagger init spec

Сгенерируйте код клиента на основе OpenAPI-спецификации:
swagger generate client -f swagger.json

Сгенерируйте код сервера на основе OpenAPI-спецификации:
swagger generate server -f swagger.json