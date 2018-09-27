"use strict"
const SPAWN_INTERVAL = 700;
const SHORT_DELAY = 700;
const LONG_DELAY = 2000;
const WORD_LIST = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];

class WordSpawner {
    constructor() {
        this.spawnerID = null;
        this.gameBodyEl =  document.querySelector("main");
    
    }
    startSpawner(numWordsToSpawn) {
        spawnerID = setInterval(() => {
            let randIdx = Math.floor(Math.random() * WORD_LIST.length);
            let gameWord = gameWordFactory.makeWord(WORD_LIST[randIdx]);
            wordManager.addWord(gameWord);
            gameBodyEl.prepend(gameWord.domElementRef); 
            if(++numWordsSpawned === numWordsToSpawn) this.stopSpawner();
        }, SPAWN_INTERVAL);
    }
    stopSpawner() {
        clearInterval(spawnerID);
        spawnerID = null;   
    }
}
