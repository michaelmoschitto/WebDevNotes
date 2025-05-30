'use strict';
let rls = require('readline-sync');

let findMatches = function (model, guess) {
    let result = {
        exact: 0,
        inexact: 0
    };
    let mMatches = [], gMatches = [];

    for (let i = 0; i < model.length; i++)
        if (model[i] === guess[i]) {
            mMatches[i] = gMatches[i] = true; //assignments have value 
            result.exact++;
        }

    for (let i = 0; i < model.length; i++)
        for (let j = 0; j < guess.length; j++)
            if (!mMatches[i] && !gMatches[j] && model[i] === guess[j]) {
                mMatches[i] = gMatches[j] = true; //mMatches[i] undf if not set everything has a True/False Value
                result.inexact++;
            }

    return result;
};

// Boolean examples:
// val = vals[0] || 42;  // vals[0] ? vals[0] : 42 <-- Js returns first if true, else defaults to second part
// val = obj && obj.property; <-- if first part is false get that back, else default to second part


let getGuess = function (params) {
    let line, letters, letter, errors;

    do {
        letters = [];
        errors = 0;
        if (line = rls.question("Enter a guess: ")) {
            letters = line.trim().toUpperCase().split('');
            for (let i = 0; i < letters.length; i++) {
                letter = letters[i];
                if (letter.length !== 1 || letter < 'A' ||
                    letter > params.maxChar) {
                    console.log(letters[i], " is not a valid guess");
                    errors++;
                }
            }
            if (letters.length < params.length) {
                console.log("Guess is too short");
                errors++;
            } else if (letters.length > params.length) {
                console.log("Guess is too long");
                errors++;
            }
        }
    } while (line && errors); //uses errors line as boolean test "" === false

    return letters;
};

module.exports = {
    findMatches: findMatches,
    getGuess: getGuess
};
// or module.exports = {findMatches, getGuess} in ES6
