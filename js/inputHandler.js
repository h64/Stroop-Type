"use strict"

/* 
 * Sanitizes input by returning only lowercase a-z chars,
 * or null for invalid keys
*/
var inputHandler = (function() {
    function keyInputIsValid(key) {
        let input = key.toLowerCase();
        switch(input) {
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

    /* returns a lowercase a-z char, or null */
    function strictToLowerCase(key) {
        return (keyInputIsValid(key)) ? key.toLowerCase() : null; 
    }

    /* Forwards kepress events only if they meet criteria */
    function registerEventHandler() {
        document.addEventListener("keypress", kp_eh);
    }
    function kp_eh(evt) {
        if(strictToLowerCase(evt.key)) 
        dispatchCustomKeyEvent(evt.key); 
    }
    function unregisterEventHandler() {
        document.removeEventListener("keypress", kp_eh);
    }

    function dispatchCustomKeyEvent(inputKey) {
        let evt = new CustomEvent("safeKeyPress");
        evt.key = inputKey;
        document.dispatchEvent(evt);
    }

    return {
        unregisterListener: unregisterEventHandler,
        registerListener: registerEventHandler
        

    };
})();

