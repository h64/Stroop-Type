"use strict"
const SPAWN_INTERVAL = 850;
const WORD_LIST = ["connection","cause","chief","crate","subtract","holiday","hollow","toothsome","swing","belligerent","serve","stage","possessive","curious","blade","attempt","stain","river","ad hoc","shelter","nut","church","cumbersome","ship","clear","slip","crush","harbor","vase","talk","deeply","waste","tearful","wind","warm","skip","dance","smell","addition","light","whisper","ablaze","crib","reproduce","flock","square","fresh","daily","afraid","happen","finicky","vegetable","record","planes","bear","time","jaded","ratty","applaud","clean","utter","heavy","impolite","abandoned","waiting","sip","pen","suit","ludicrous","flowers","desert","yawn","rub","healthy","coast","tidy","picayune","stereotyped","cow","vigorous","lie","cowardly","low","abnormal","detail","love","faithful","sedate","tendency","woozy","simplistic","calendar","form","horrible","stocking","enjoy","annoyed","assorted","knowing","sign","fast","children","dock","plastic","greedy","numerous","scary","entertain","brass","tickle","oatmeal","troubled","daffy","coal","cabbage","childlike","morning","supreme","bounce","paper","agree","experience","well-made","stimulating","need","feeble","zip","majestic","rot","chickens","spray","motion","pass","penitent","eatable","impress","clip","innate","advice","rebel","silly","earth","coach","repeat","ugly","mammoth","shade","pets","insect","scintillating","judicious","savory","person","worm","twist","kaput","full","grotesque","terrify","red","exciting","business","school","historical","chase","furniture","loutish","long-term","embarrassed","tasteless","ground","division","highfalutin","flagrant","dry","angry","hydrant","disapprove","type","selfish","finger","snail","worried","driving","joke","wooden","books","bang","bulb","late","start","sky","nerve","purple","knock","hook","detect","hissing","lamentable","sack"];

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
