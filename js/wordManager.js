"use strict"

var wordManager = (function() {
    var gameWords = []; //holds the gameWord objects    
    var currentWord = null;
    var keyStats = {
        totalKeyPresses: 0,
        totalKeyMatches: 0,
    };
    function initKeyCounter() {
        keyStats.totalKeyPresses = 0;
        keyStats.totalKeyMatches = 0;
    };
    function getKeyPresses() {
        return keyStats.totalKeyPresses;
    }
    function getKeyMatches() {
        return keyStats.totalKeyMatches;
    }

    function handleKeyInput(key) {
        if(!currentWord) currentWord = findFirstMatchingWord(key);
        typeNextLetter(key); 
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

        //add keypress to statistics
        keyStats.totalKeyPresses++;

        //reject keypress if it doesn't match gameWord's next letter
        let nextChar = currentWord.word[currentWord.nextCharIdx];
        if(key !== nextChar) {
            keyStats.totalKeyMatches++;
            //add to miss count and statistics
            return;
        }

        //Otherwise, color letter
        let letters = currentWord.domElementRef.children;
        let span = letters[currentWord.nextCharIdx];
        setStyle(span);

        //then progress the gameWord to the next letter
        currentWord.nextCharIdx++;

        //explode the gameWord if the word is finished
        if(currentWord.nextCharIdx === currentWord.word.length) 
            explodeWord(currentWord);  
            
    }

    function explodeWord(word) {
        //remove word from internal array
        let idx = gameWords.indexOf(word);
        gameWords.splice(idx, 1);
        //remove word from dom
        //give the exploded word some style
        // let wordToDelete = currentWord;
        let domRef = word.domElementRef;
        domRef.textContent = "BOOM";
        domRef.style.color = "yellow";

        //delete element on a delay
        setTimeout(function() {
            deleteWord(word);
        }, 500);

        currentWord = null;
    }

    function findFirstMatchingWord(key) {
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

    function deleteWord(word) {
        word.removeSelfFromDom();
    }

    function clearAll() {
        stopAnimations();
        let main = document.querySelector("main");
        gameWords.forEach(function(gameWord) {
            deleteWord(gameWord);
        });
        gameWords.length = 0;
        currentWord = null;
        // keyStats.totalKeyMatches = 0;
        // keyStats.totalKeyPresses = 0;
    }

    return {
        initKeyCounter, initKeyCounter,
        getKeyPresses, getKeyPresses,
        getKeyMatches, getKeyMatches, 
        addWord: addWord, 
        handleInput: handleKeyInput,
        stopAnimations: stopAnimations,
        clearAll: clearAll
    };
})();