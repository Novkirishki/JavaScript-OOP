// Write a function that sums an array of numbers:
// Numbers must be always of type Number
// Returns null if the array is empty
// Throws Error if the parameter is not passed (undefined)
// Throws if any of the elements is not convertible to Number

function sum(arr) {
	var sum = 0,
		index,
		len,
		element;
	if (arr === undefined) {
		throw new Error("No argument passed");
	} else if (arr.length == 0){
		return null;
	}
	for (index = 0, len = arr.length; index < len; index += 1) {
		element = Number(arr[index]);
		if (isNaN(element)) {
			throw new Error("Invalid element");
		}
		sum += element;
	}
	return sum;
};