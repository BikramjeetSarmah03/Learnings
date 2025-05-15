package main

// slices are dyanmic arrays
// most used construct in go
// + useful methods

func main() {

	// unintialiezd slice is nil
	// var nums []int

	// fmt.Println(nums == nil)
	// fmt.Println(len(nums))

	// make first arg is type and 2nd is length and 3rd is capacity (optional)
	// var nums = make([]int, 0, 5)
	// nums := []int{} // shorthand

	// fmt.Println(len(nums))
	// cap -> capacity = max nums of elements that can be fit
	// capacity gets double if length increases
	// fmt.Println(cap(nums))

	// nums = append(nums, 1)
	// nums = append(nums, 2)
	// nums = append(nums, 3)
	// nums = append(nums, 4)
	// nums[0] = 6

	// fmt.Println(nums)

	// // copying a slice
	// var num2 = make([]int, len(nums))

	// fmt.Println(nums, num2)

	// // destination, source
	// copy(num2, nums)

	// fmt.Println(nums, num2)

	// slice operators ( : )
	// var nums = []int{1, 2, 3}

	// fmt.Println(nums[0:2]) // here  : is the slice operator, from : to
	// fmt.Println(nums[:1])  // here from is by default 0 and to 1
	// fmt.Println(nums[1:])  // here from is 1 and to is default to all

	// slices
	// var nums1 = []int{1, 2}
	// var nums2 = []int{1, 2}

	// // slices is the inbuilt function
	// fmt.Println(slices.Equal(nums1, nums2))

	// 2d slices
	// var nums = [][]int{{1, 2, 3}, {4, 5, 6}}
	// fmt.Println(nums)
}
