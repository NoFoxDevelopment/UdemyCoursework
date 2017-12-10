// Define a new function named average
//It should take a single parameter: an array of test scores(all numbers)
//It should return the average score in the array, rounded to the nearest whole number


function average(arr) {
    var sum = 0;
    for (var i=0; i<arr.length; i++) {
        sum += arr[i];
    }
    //console.log(sum);
    return Math.round(sum/arr.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94]; //should return 94
console.log('Average score for environment science: ' + average(scores));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]; //should return 68
console.log('Average score for organic chemistry: ' + average(scores2));