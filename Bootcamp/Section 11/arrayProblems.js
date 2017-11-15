//Write a function called printReverse() that takes an array as an argument
//and prints out the elements in the array in reverse order.
//Don't actually reverse the array itself.

function printReverse(arr) {
	for (let i=arr.length-1; i>=0; i--) {
		console.log(arr[i]);
	}
}

//Write a function called isUniform() which takes an array as an argument
//and returns true if all elements in the array are identical

function isUniform(arr) {
	let n = arr[0];
	for (let i = 0; i<arr.length-1; i++) {
		console.log(arr[i] + " = " + arr[i+1])
		if (arr[i] !== arr[i+1]) {
			return false;
		}
	} return true;
}

//Write a function sumArray() that accepts an array as an argument
//and returns the sum of all numbers in the array

function sumArray(arr) {
	var total = 0;
	arr.forEach(function(ele, i) {
		total += ele;
	})
	console.log(total);
}

//Write a function max() that accepts as an array of numbers and
//returns the maximum number in the array

function max(arr) {
	return Math.max(...arr);
}