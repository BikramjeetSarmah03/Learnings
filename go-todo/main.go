package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        int    `json:"id" bson:"_id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("Hello World")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	DATABASE_URL := os.Getenv("DATABASE_URL")

	clientOptions := options.Client().ApplyURI(DATABASE_URL)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal("Error while connecting mongodb: ", err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error while pinging mongodb: ", err)
	}

	fmt.Println("Connected to MONGODB")
}
