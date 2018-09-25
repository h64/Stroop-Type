"use strict"

const inputHandler = (function() {

    function handleKeyInput(key) {
        let input = key.toLowerCase();
        console.log(gameWords);
    };

    return {
        input: handleKeyInput
    };
})();