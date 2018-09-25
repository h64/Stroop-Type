"use strict"
const STARTING_WORDS = 10;
const SPAWN_INTERVAL = 500;
const SPAWNER_NAME = "spawn";

// const STARTING_WORDS = 1000;
// const SPAWN_INTERVAL = 300;


var wordManager = wordManager; //wordManager.js
var wordFactory = gameWordFactory; //gameWordFactory.js
var wordList = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];



var gameCoordinator = (function() {
    var numWordsSpawned = 0;
    var spawnerID = null;
    function start() {
        
    }

    function startGame() {
        registerEventListeners();
        let wordsToSpawn = STARTING_WORDS;

        startRound(wordsToSpawn);
    }

    function startRound(numWordsToSpawn) {
        numWordsSpawned = 0;
        startSpawner(numWordsToSpawn);

    }

    function endRound() {
        stopSpawner();
        numWordsSpawned = 0;
    }

    

    function endGame() {

    }

    function startSpawner(numWordsToSpawn) {
        spawnerID = setInterval(spawn, SPAWN_INTERVAL);
        function spawn() {
            let randIdx = Math.floor(Math.random() * wordList.length);
            let gameWord = wordFactory.makeWord(wordList[randIdx]);
            wordManager.addWord(gameWord);
            //gameBody var dependency
            gameBody.prepend(gameWord.domElementRef); 
            if(++numWordsSpawned === numWordsToSpawn) stopSpawner();
        }
    }

    function stopSpawner() {
        clearInterval(spawnerID);
        spawnerID = null;
    }


    function registerEventListeners() {
        document.addEventListener("gameover", function(evt) {
            wordManager.stopAnimations();
            endRound();
            console.log("Your base is destroyed! Game over");
        });
        document.addEventListener("keypress", function(evt) {
            wordManager.handleInput(evt.key)
        });
    }

    return {
        start: start,
        endGame: endGame,
    };
})();