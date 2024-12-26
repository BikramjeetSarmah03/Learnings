package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// API Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"msg": "Hello world"})
	})

	fmt.Println("Server Running")
	log.Fatal(app.Listen(":4000"))
}
