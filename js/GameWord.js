"use strict"

const REMOVE_DELAY = 800;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const MOVE_AMT = 10;
const MOVE_INTERVAL = 100;

class GameWord {
    constructor(word) {
        this.word = word;
        this.nextCharIdx = 0;
        this.domElementRef = this.createDomElement(word);
        this.animationID = this.setAnimation(this.domElementRef);
    }
    createDomElement(word) {
        let gameWordElement = document.createElement("div");
        gameWordElement.classList.add("gameWord");
        //For each letter in the input string, create a span for that letter
        word.split("").forEach(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            gameWordElement.appendChild(span);
        }); 
        return gameWordElement; 
    }

    explodeSelf() {
        clearInterval(this.animationID);
        this.domElementRef.textContent = "BOOM";
        this.domElementRef.style.color = "yellow";
        setTimeout(() => {
            this.domElementRef.remove();
        }, REMOVE_DELAY);
    }

    setAnimation(domRef) {
        let randXPos = Math.floor(Math.random() * (GAME_WIDTH-150));
        let maxYPos = GAME_HEIGHT - 25;
        let style = domRef.style;

        style.left = randXPos + "px";
        style.top = "0px";

        let animationID = setInterval(() => {
            if(parseInt(style.top) > maxYPos) {
                this.explodeSelf();
                let gameOver = new Event("gameover");
                document.dispatchEvent(gameOver);
            }
            style.top = parseInt(style.top) + MOVE_AMT + "px";
        }, MOVE_INTERVAL);

        return animationID;
    }

    
    colorNextLetter() {
        let letters = this.domElementRef.children;
        let span = letters[this.nextCharIdx];
        span.style.color = "red";
    }
}