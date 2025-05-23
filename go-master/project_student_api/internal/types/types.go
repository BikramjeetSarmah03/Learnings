package types

// validating using go-playground validator

type Student struct {
	Id    int
	Name  string `validate:"required"`
	Email string `validate:"required"`
	Age   int    `validate:"required"`
}
