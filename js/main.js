"use strict"
/* Constants */
const DEBUG = true;

/* App Variables */
var wordList = ["cat", "dog", "javascript", "peanut", "dolphin"];

/* DOM and File references */
var gameBody = {}; //holds the dom elements
var gameCoordinator = gameCoordinator; //gameCoordinator.js

//Dependencies:
//main
//  -gameCoordinator
//    -wordFactory
//    -wordManager
//      -inputHandler 
//  -dictionary?


/* Functions */
function initGameVars() {
    gameBody = document.querySelector("main");
}

function registerEventListeners() {
    document.addEventListener("gameover", function(evt) {
        wordManager.stopAnimations();
        console.log("Your base is destroyed! Game over");
    });
    document.addEventListener("keypress", function(evt) {
        wordManager.handleInput(evt.key)
    });
}

// function makeAGameWord() {
//     let randIdx = Math.floor(Math.random() * wordList.length);
//     let gameWord = wordFactory.makeWord(wordList[randIdx]);
//     wordManager.addWord(gameWord);
//     gameBody.prepend(gameWord.domElementRef);
// }

/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    if(DEBUG) console.log("DOM loaded");
    initGameVars();
    registerEventListeners();
});
