package main

import (
	"fmt"
)

func main() {

	// simple switch
	// i := 5

	// // break is auto handled
	// switch i {
	// case 1:
	// 	fmt.Println("One: 1")
	// case 2:
	// 	fmt.Println("Two: 2")
	// default:
	// 	fmt.Println("Default")
	// }

	// multiple condition switch
	// switch time.Now().Weekday() {
	// case time.Saturday, time.Sunday:
	// 	fmt.Println("Saturday, Sunday")
	// default:
	// 	fmt.Println("Workday")
	// }

	// type switch
	// interface{} is also any
	whoAmI := func(i interface{}) {
		switch t := i.(type) {
		case int:
			fmt.Println("Integer")
		case string:
			fmt.Println("String")
		default:
			fmt.Println("Other: ", t)
		}
	}

	whoAmI(10.5)
}
