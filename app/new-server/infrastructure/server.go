package infrastructure

import (
	middlewareutils "new-server/adopter/middleware"
	"new-server/graph"
	"new-server/graph/generated"
	customcontext "new-server/infrastructure/customContext"
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

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			cc := &customcontext.CustomContext{Context: c, DB: db}
			return next(cc)
		}
	})

	e.Use(middlewareutils.VerifyJwt)

	graphqlHandler := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{
		Resolvers:  &resolvers.Resolver{DB: *db},
		Directives: graph.NewDirective(),
	}))

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
