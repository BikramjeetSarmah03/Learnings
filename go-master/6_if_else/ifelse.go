package main

import "fmt"

func main() {

	age := 16

	if age >= 18 {
		fmt.Println("Adult")
	} else if age >= 12 {
		fmt.Println("Teenager")
	} else {
		fmt.Println("Child")
	}

	var role = "admin"
	var hasPermissions = true

	if role == "admin" && hasPermissions {
		fmt.Println("Admin + Permission")
	}

	if a := 20; a >= 18 {
		fmt.Println("inline variable: ", a)
	}

	// do doesn't have ternary operator
	// we have to use normal if else
}
