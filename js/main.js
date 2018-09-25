"use strict"
/* Constants */
const DEBUG = true;

/* App Variables */
var gameBody = {}; //holds the dom elements
var gameWords = []; //holds the gameWord objects

var wordList = ["cat", "dog", "javascript"];



/* Functions */
function initGameVars() {
    gameBody = document.querySelector("main");
};
function registerEventListeners() {
    document.addEventListener("gameover", function(evt) {
        //Stop the animation on 
        gameWords.forEach(function(gameWord) {
            clearInterval(gameWord.animation);
        });
        console.log("Your base is destroyed! Game over");
    });
    document.addEventListener("keypress", function(evt) {
        inputHandler.input(evt.key)
    });
};

function makeAGameWord() {
    let randIdx = Math.floor(Math.random() * wordList.length);
    let gameWord = gameWordFactory.makeWord(wordList[randIdx]);

    gameBody.prepend(gameWord.domElement);
    gameWords.push(gameWord);



    
}



/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    if(DEBUG) console.log("DOM loaded");
    initGameVars();
    registerEventListeners();
});
