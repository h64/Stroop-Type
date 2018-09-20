# Stroop-Type
A text typer game exploring the Stroop Effect

## Wireframes
### Title Screen
![title screen](https://i.imgur.com/A9OjQEl.png)

### Normal Game Screen
![normal game screen](https://i.imgur.com/oC7VSaM.png)

### Stroop Game Screen
![strrop game screen](https://i.imgur.com/RDdasSy.png)

### My Stats Screen
![my stats screen](https://i.imgur.com/B2WskxV.png)


## Psuedocode
### On document load:
	Display main menu:
        Setup main div size, and within it:
            Show the title, and links to the normal game, 
            stroop game, and stats menu
	
### On "Normal Game Start" click
	Load normal game:
        Erase screen and load a set of elements:
		    Draw elements:
			    Player at bottom of screen
                Spawn X # of words on an interval starting at the top of the screen
                that are moving to the bottom of the screen

			Take player keyboard input:
                If the keypress matches the first letter of one of the words,
                lock in that word as the "current word", and only allow keypresses
                that are the subsequent letters

			Track stats - WPM, error%; persistent across games
			
	
### On "Stroop Game Start" click	
	Same as Normal Game Start, however words from a second wordset will also
    spawn in. These words will be "Stroop" words, where the text and 
    and background color are incorrect from what the word says.
        ie. the word "Red" with a green text color and background


### On "My Stats" click
	Load stats menu
		Display stats