"use strict"
const GAME_WIDTH = 500;
const MOVE_AMT = 5;
const MOVE_INTERVAL = 200;

var gameWordFactory = (function() {
    // Create a div element in DOM 
    function createGameWordInDOM(word) {
        let gameWordDiv = document.createElement("div");
        //For each letter in the input string, create a span for that letter
        word.split("").forEach(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            gameWordDiv.appendChild(span);
        }); 
        //Style the div w/ color and positioning
        styleGameWord(gameWordDiv);
        //Prepend the div to the gameBody, then return the newly made div
        gameBody.prepend(gameWordDiv);
        if(DEBUG) console.log(`div spawned w/ xPos: ${gameWordDiv.style.left}`);
        return gameWordDiv;
    };

    // Style the DOM element w/ colors and position
    function styleGameWord(gameWordDiv) {
        let randXPos = Math.floor(Math.random() * (GAME_WIDTH-75));
        gameWordDiv.style.left = randXPos + "px";
        gameWordDiv.style.top = "0" + "px";
        //give each element an interval that gives them vertical movement
        let interval = setInterval(function() {
            let yPos = parseInt(gameWordDiv.style.top);
            if(yPos > 650) {
                clearInterval(interval);
                let wordToDelete = gameWords.shift().domRef;
                gameBody.removeChild(wordToDelete);
            }
            gameWordDiv.style.top = parseInt(gameWordDiv.style.top) + MOVE_AMT + "px";
        }, MOVE_INTERVAL);
    };

    // Make a gameWord object
    function makeGameWord(aWord) {
        let gameWord = {
            word: aWord,
            remainingChars: aWord.split(""),
            domRef: createGameWordInDOM(aWord)
        }
        gameWords.push(gameWord); //separate this logic
        return gameWord; 
    };

    return {
        makeWord: makeGameWord, 
    };
})();
