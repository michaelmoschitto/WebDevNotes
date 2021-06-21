'use strict';
let readParams = require("./ReadParams.js"); // need the ./ to show from another file
let guessUtils = require("./GuessUtils.js");
let rls = require('readline-sync');

let mMind = function () { //functions are OBJECTS and can be assigned to variables. MMind is a reference to the function
    let numGames = 0, totalTries = 0, matches, model = [];
    let params = readParams();
    let average;

    console.log("Params: ", params);
    while (true) {
        average = totalTries / numGames; //0 division results in NaN not error
        console.log("Current average: ",
            isNaN(average) ? "N/A" : average.toPrecision(2)); //cannot say average == NaN. average.toPrecision(2) creates wrapper object around elemental type average
        if (rls.question('Play a game? ').trim().toUpperCase().charAt(0) !== "Y") //method chaining
            break;

        numGames++;
        for (let i = 0; i < params.length; i++) { // <-- one way to get length
            model[i] = String.fromCharCode('A'.charCodeAt(0) //unicode NOT ASCII    
                + Math.random() * params.randRange); //model is hash table using indexes as lookup keys   
        }
        console.log("Here's the answer: ", model.join(''));
        do {
            matches = guessUtils.findMatches(model, guessUtils.getGuess(params));
            console.log(`${matches.exact} exact and ${matches.inexact} inexact.`); //backquoting a string allows you to use ${}
            totalTries++;
        } while (matches.exact < params["length"]); // <-- another way to get length
    }
};

mMind();