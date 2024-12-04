package main

import "fmt"

func main() {
	// user input
	var input int

	fmt.Println("Hey, Enter the number: ")
	// passing address by &
	fmt.Scanf("%d", &input)

	fmt.Println("Here is your number: ", input)
}

// go is case sensitive
