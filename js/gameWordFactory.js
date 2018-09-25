"use strict"
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const MOVE_AMT = 5;
const MOVE_INTERVAL = 200;

/*
* A gameWord is an object that contains a word string, a remaininChar array,
* a documentFragment that must be placed in the DOM, and a event?                       
*/
var gameWordFactory = (function() {
    function createDomElement(word) {
        let gameWordElement = document.createElement("div");
        //For each letter in the input string, create a span for that letter
        word.split("").forEach(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            gameWordElement.appendChild(span);
        }); 
        // if(DEBUG) console.log(`gameWord ${word} created`);
        return gameWordElement; 
    };

    function setMovement(gameWordElement) {
        let randXPos = Math.floor(Math.random() * (GAME_WIDTH-75));
        let maxYPos = GAME_HEIGHT - 50;
        let style = gameWordElement.style;

        style.left = randXPos + "px";
        style.top = "0px";

        let animation = setInterval(function() {
            if(style.top > maxYPos) {
                clearInterval(animation);
                //signal that this gameWord needs to be deleted from
                //gameWords array
                //and also removed from gameBody
            }
            //else, increment the position
            style.top = parseInt(style.top) + MOVE_AMT + "px";
        }, MOVE_INTERVAL);
    };

    function makeGameWord(aWord) {
        let gameWord = {
            word: aWord,
            remainingChars: aWord.split(""),
            domElement: createDomElement(aWord),
        }
        gameWord.movement = setMovement(gameWord.domElement);
        return gameWord; 
    };

    return {
        makeWord: makeGameWord, 
    }
})();
