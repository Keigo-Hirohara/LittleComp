package main

import (
	dbschema "new-server/db-schema"
	"new-server/graph"
	"new-server/resolvers"
	"new-server/utils"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	err := utils.LoadEnv()
	if err != nil {
		panic(err)
	}

	dsn := "host=localhost user=user password=pass dbname=littlecomp port=5112"

	if os.Getenv("DATABASE_HOST") != "" &&
		os.Getenv("DATABASE_USER") != "" &&
		os.Getenv("DATABASE_PASSWORD") != "" &&
		os.Getenv("DATABASE_NAME") != "" &&
		os.Getenv("DATABASE_PORT") != "" {
		dsn = "host=" + os.Getenv("DATABASE_HOST") + " user=" + os.Getenv("DATABASE_USER") + " password=" + os.Getenv("DATABASE_PASSWORD") + " dbname=" + os.Getenv("DATABASE_NAME") + " port=" + os.Getenv("DATABASE_PORT")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("データベースの接続に失敗しました")
	}

	db.AutoMigrate(
		&dbschema.User{},
		&dbschema.Story{},
		&dbschema.Task{},
	)

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	graphqlHandler := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &resolvers.Resolver{DB: *db}}))

	playgroundHandler := playground.Handler("GraphQL playground", "/query")

	e.POST("/query", func(c echo.Context) error {
		graphqlHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	e.GET("/playground", func(c echo.Context) error {
		playgroundHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	port := "8080"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	err = e.Start(":" + port)
	if err != nil {
		panic(err)
	}
}
