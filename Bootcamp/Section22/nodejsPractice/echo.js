// NODE EXERCISE

// Using the command line, create a file "echo.js"
// Inside the file, write a function named echo that takes 2 arguments: a string and a number
// It should print out the string, number number of times

function echo(s, n) {
    for (var i=0; i<n; i++) {
        console.log(s);
    }
}

echo("Echo!!!", 10);
echo("Tater Tots", 3);