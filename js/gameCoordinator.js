"use strict"
const STARTING_WORDS = 10;


var wordManager = wordManager; //wordManager.js
var wordFactory = gameWordFactory; //gameWordFactory.js
var wordList = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];



var gameCoordinator = (function() {
    function startGame() {
        registerEventListeners();
        if(DEBUG) console.log("Event Listeners Registered");
        let wordsToSpawn = STARTING_WORDS;
        wordsToSpawn++; 
        startRound(wordsToSpawn);
        if(DEBUG) console.log("Words spawned");
    }

    function startRound(numWordsToSpawn) {
        for(let i = 0; i < numWordsToSpawn; i++) {
            // setTimeout(function() {
                let randIdx = Math.floor(Math.random() * wordList.length);
                let gameWord = wordFactory.makeWord(wordList[randIdx]);
                wordManager.addWord(gameWord);
                //gameBody var dependency
                gameBody.prepend(gameWord.domElementRef); 
            // }, 100);
        }
    }

    function endRound() {

    }

    function endGame() {

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

    return {
        startGame: startGame,
        endGame: endGame,
    };
})();