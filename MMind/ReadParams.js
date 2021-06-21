'use strict';
// syntax for getting existing library 
// returns object as function call
let rls = require('readline-sync');

// funtion declared with function keyword, params in parens
// module.exports allows inclusion in other files
module.exports = function () { 

    // declares vars but no type == typless
    let paramLine, params;

    while (true) {

        // works like python, takes string splits on ' '
        paramLine = rls.question("Enter max character and number of characters: ")
            .split(' ');

        // do not use == or !== <-- trap use === or !==
        if (paramLine.length !== 2)
            // console.log 
            console.log("Must have two entries");
        else {
            // Javascript object notation JSON
            // {
                // property: value,
            // }
            params = {
                maxChar: paramLine[0].toUpperCase().charAt(0),
                // use parseInt to cast
                // int and floats are same, don't care about speed       
                length: parseInt(paramLine[1])
            };
            
            // no char type, use 1 letter string
            if (params.maxChar < "A" || params.maxChar > "F")
                console.log("Max char must be between A and F");
            else if (!params.length || params.length > 10)
                console.log("Number of chars must be between 1 and 10");
            else {
                // charCodeAT F --> 70
                // Ascii doesn't represent 
                params.randRange = params.maxChar.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
                return params;
            }
        }
    }
};