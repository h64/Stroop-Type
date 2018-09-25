"use strict"

var wordManager = (function() {
    var gameWords = []; //holds the gameWord objects    
    var currentWord = null;

    function handleKeyInput(key) {
        let input = key.toLowerCase();
        if(!keyInputIsValid(key)) return;
        if(!currentWord) currentWord = findFirstMatchingWord(key);
        typeNextLetter(key); 
        
        // console.log(gameWords[0].domElementRef);
        // console.log(currentWord);
    }

    function keyInputIsValid(key) {
        switch(key) {
            case "a": case "b": case "c": case "d": case "e": case "f":
            case "g": case "h": case "i": case "j": case "k": case "l":
            case "m": case "n": case "o": case "p": case "q": case "r":
            case "s": case "t": case "u": case "v": case "w": case "x":
            case "y": case "z": 
                return true;
            default:
                return false;
        }
    }

    /*
    * 1. reject keypresses when there are no words out
    * 2. reject keypress if it doesn't match gameWord's next letter
    * 3. progress the gameWord to the next letter
    * 4. explode the gameWord if the word is finished
    */
    function typeNextLetter(key) {
        //reject keypresses when there are no words out
        if(!currentWord) return;

        //reject keypress if it doesn't match gameWord's next letter
        let nextChar = currentWord.word[currentWord.nextCharIdx];
        if(key !== nextChar) {
            //add to miss count and statistics
            return;
        }

        //Otherwise, progress the gameWord to the next letter
        let letters = currentWord.domElementRef.children;
        let span = letters[currentWord.nextCharIdx];
        console.log(span);
        setStyle(span);

        //explode the gameWord if the word is finished
        currentWord.nextCharIdx++;
        if(currentWord.nextCharIdx === currentWord.word.length) {
            //the word is done, make it go boom
            //remove the word from the gameWords[] list
            //set currentWord to null
            removeWord();
            return;
        }
    }

    function removeWord() {
        //remove word from internal variables
        let idx = gameWords.indexOf(currentWord);
        gameWords.splice(idx, 1);
        currentWord = null;

        //remove word from dom
        console.log(gameWords);
        console.log("boom");
    }

    function findFirstMatchingWord(key) {
        console.log("enter findFirst()");
        console.log(gameWords);
        let firstWord = gameWords.find(function(gameWord) {
            if(key === gameWord.word[0]) return true;
        });
        return firstWord === undefined ? null : firstWord;
    }


    function addWord(gameWord) {
        gameWords.push(gameWord);
    }

    function stopAnimations() {
        gameWords.forEach(function(gameWord) {
            gameWord.stopAnimation();
        });
    }

    function setStyle(span) {
        span.style.color = "red";
    }

    function clearAll() {
        stopAnimations();
        let main = document.querySelector("main");
        gameWords.forEach(function(gameWord) { 
            main.removeChild(gameWord.domElementRef);
        });
    }

    return {
        addWord: addWord, 
        handleInput: handleKeyInput,
        stopAnimations: stopAnimations,
        clear: clearAll
    };
})();