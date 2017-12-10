var faker = require('faker');
var greeting =  "================================" + "\n" +
                "Welcome to Wild 'n' Wacky Wares!" + "\n" +
                "================================" +

function makeProd () {
    console.log(greeting);
    for (var i=0; i<10; i++) {
        var randProd = faker.commerce.productName();
        var randPrice = faker.commerce.price();
        console.log(randProd + " - $" + randPrice);
    }
}

makeProd()