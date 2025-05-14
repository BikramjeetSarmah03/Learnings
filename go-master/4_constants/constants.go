package main

import "fmt"

const age = 30 // can be declared outside
// shortHand := "golang" // not allowed

func main() {
	// const name = "Bikram" // declaring const
	// const age = 30

	// name = "hey" // can't be reasign

	// grouping
	const (
		port = 5000
		host = "localhost"
	)

	fmt.Println(port, host)
}
