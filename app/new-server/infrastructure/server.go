package infrastructure

import (
	"new-server/graph"
	"new-server/infrastructure/resolvers"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/gorm"
)

func SetupServer(db *gorm.DB) {
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

	err := e.Start(":" + port)
	if err != nil {
		panic(err)
	}
}
