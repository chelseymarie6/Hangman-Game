//Global variables
//
// Used to record how many times a letter can be pressed
var alphaBet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//Holds all the words
var wordBank = ["cactus", "cowboy", "cowgirl", "horse", "sunset", "spur", "saddle", "boots", "rope", "snake"];
//Holds chosenWord
var chosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds blanks and successful guesses
var blanksAndSuccesses = [];
//Holds wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 7;
var rightGuessCounter = 0;
//FUNCTIONS
//
function startGame() {
	//Chooses word randombly from the wordBank
	chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = chosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 7;
	wrongLetters =[];
	blanksAndSuccesses =[];
	alphaBet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++){
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	// Testing / Debugging
	console.log(chosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code

startGame();

document.onkeyup = function(event) {
	test = true;
	var letterGuessed = event.key;
	
	for(var i = 0; i < alphaBet.length; i++) {	
		
		if(letterGuessed === alphaBet[i] && test === true) {
			var spliceDword = alphaBet.splice(i,1);
			//Test / Debug
			console.log('Word is = ' + alphaBet[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}				
}

function reset() {
	//Chooses word randomly from the wordBank
	chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = chosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 7;
	wrongLetters =[];
	blanksAndSuccesses =[];
	alphaBet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	test=false;
	startGame();
}

function compareLetters(userKey) {
				console.log('it works');
				//If user key exist in choosen word then perform this function 
				if(chosenWord.indexOf(userKey) > -1) {
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++) {
						//Fills in right index with user key
						if(lettersInWord[i] === userKey) {
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							console.log(blanksAndSuccesses);
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					//Test / Debug
					console.log(blanksAndSuccesses);
				}
				//Wrong Keys
				else {
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}	
}

function winLose() {
	// When number blanks is filled with right letters then you win
	if(rightGuessCounter === numBlanks) {
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		alert("You win!! That venom won't getcha after all!");
		reset();
	}
	// When number of guesses reaches 0 then You lose
	else if(guessesLeft === 0) {
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert("You lose...sorry bout that snake venom!");
		reset();
	}
}