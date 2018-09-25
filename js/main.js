"use strict"
/* Constants */
const DEBUG = true;

//Dependencies:
//main
//  -gameCoordinator
//    -wordFactory
//    -wordManager
//      -inputHandler 
//  -dictionary?

/* App Variables */

/* DOM and File references */
var gameBody = {}; //holds the dom elements
var gameCoordinator = gameCoordinator; //gameCoordinator.js



/* Functions */
function initGameVars() {
    gameBody = document.querySelector("main");
}





/* Event Handlers */
document.addEventListener("DOMContentLoaded", function(evt) {
    if(DEBUG) console.log("DOM loaded");
    initGameVars();
    if(DEBUG) console.log("gameBody reference loaded");
    gameCoordinator.start();
    if(DEBUG) console.log("Game started");

});
