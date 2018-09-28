"use strict"
const SPAWN_INTERVAL = 700;
const WORD_LIST = ["form","slave","cannon","fireman","carpenter","voyage","needle","card","act","wind","music","crack","transport","plough","mountain","band","peace","wire","animal","secretary","queen","clocks","liquid","flesh","rake","lumber","jellyfish","houses","snails","afternoon","jewel","stage","club","grip","vessel","sofa","attack","insurance","cloth","bean","lizards","dog","birth","quiver","box","kettle","wing","bean","bell","farm"];

class WordSpawner {
    constructor(wordManagerRef, numWordsToSpawn) {
        this.gameBodyEl = document.querySelector("main");
        this.numWordsSpawned = 0;
        this.wordManager = wordManagerRef;
        this.spawnerID = this.startSpawner(numWordsToSpawn);        
    }
    startSpawner(numWordsToSpawn) {
        return setInterval(() => {
            let randIdx = Math.floor(Math.random() * WORD_LIST.length);
            let gameWord = new GameWord(WORD_LIST[randIdx]);
            this.wordManager.addWord(gameWord);
            this.gameBodyEl.prepend(gameWord.domElementRef); 
            if(++this.numWordsSpawned === numWordsToSpawn) this.stopSpawner();
        }, SPAWN_INTERVAL);
    }
    stopSpawner() {
        clearInterval(this.spawnerID);
        this.spawnerID = null;   
    }
    isDoneSpawning() {
        return this.spawnerID === null ? true : false;
    }
}
