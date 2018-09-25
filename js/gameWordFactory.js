"use strict"
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const MOVE_AMT = 5;
const MOVE_INTERVAL = 200;

/*
* A gameWord is an object that represents a word used in the typing game
* including a string, a DOM element reference, and an animation.
* The gameWordFactory exposes a single `makeWord()` method, which creates 
* the gameWord from an input string.                        
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
        return gameWordElement; 
    }

    function setAnimation(gameWordElement) {
        let randXPos = Math.floor(Math.random() * (GAME_WIDTH-75));
        let maxYPos = GAME_HEIGHT - 50;
        let style = gameWordElement.style;

        style.left = randXPos + "px";
        style.top = "0px";

        let animation = setInterval(function() {
            if(parseInt(style.top) > maxYPos) {
                let gameOver = new Event("gameover");
                document.dispatchEvent(gameOver);
            }
            //else, increment the position
            style.top = parseInt(style.top) + MOVE_AMT + "px";
        }, MOVE_INTERVAL);
        return animation;
    }

    function makeGameWord(aWord) {
        let gameWord = {
            word: aWord,
            nextCharIdx: 0,
            domElementRef: createDomElement(aWord),
        }
        gameWord.animation = setAnimation(gameWord.domElementRef);
        gameWord.stopAnimation = function() {
            clearInterval(this.animation);
        };
        return gameWord; 
    }

    return {
        makeWord: makeGameWord, 
    };

})();
