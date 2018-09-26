"use strict"

/* DOM and File references */
var normalGameStartBtn = {};
var stroopGameStartBtn = {};
var endlessGameStartBtn = {};
var myStatsBtn = {};

var gameCoordinator = gameCoordinator; //gameCoordinator.js
var inputHandler = inputHandler; //inputHandler.js

/* Functions */
function initDomRefs() {
    // nav = document.querySelector("nav");
    normalGameStartBtn = document.querySelector("#normalGameBtn");
    stroopGameStartBtn = document.querySelector("#stroopGameBtn")
    endlessGameStartBtn = document.querySelector("#endlessGameBtn");
    myStatsBtn = document.querySelector("#myStatsBtn");
}

/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    initDomRefs();
    registerEventListeners();
});

function registerEventListeners() {
    inputHandler.registerListener(); 
    listenForShortcutKey();
    listenForClick();
    
}

function listenForShortcutKey() {
    let listener = document.addEventListener("safeKeyPress", function(evt) {
        console.log(evt);
        switch(evt.key) {
            case "n": 
                document.removeEventListener("safeKeyPress", listener);
                gameCoordinator.loadNormalGame();
                break;
            case "e": 
                document.removeEventListener("safeKeyPress", listener);   
                gameCoordinator.loadEndlessGame();
                break;
            case "s": 
                document.removeEventListener("safeKeyPress", listener);
                gameCoordinator.loadStroopGame();
                break;
            case "m": 
                document.removeEventListener("safeKeyPress", listener);
                gameCoordinator.loadStatsScreen();
                break;
            default:
                break;
        }
    });
}

function listenForClick() {
    normalGameStartBtn.addEventListener("click", function() {
        gameCoordinator.loadNormalGame();
    });
    endlessGameStartBtn.addEventListener("click", function() {
        gameCoordinator.loadEndlessGame();
    });
    stroopGameStartBtn.addEventListener("click", function() {
        gameCoordinator.loadStroopGame();
    });
    myStatsBtn.addEventListener("click", function() {
        gameCoordinator.loadStatsScreen();
    });
}