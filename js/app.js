/*
 * Create a list that holds all of your cards
 */

let card = document.querySelectorAll(".card");
let cardsHolder = [...card]; 
let deck = document.querySelector(".deck");
let moves = document.querySelector(".moves");
let count = 0;
const time = document.querySelector(".timer");
let seconds = 00; minutes = 00; hours = 0;
const stars = document.querySelectorAll(".fa-star")
let openedCards = deck.querySelectorAll(".open");
let matchedCards = document.getElementsByClassName("match");
let startNow;
let modal = document.getElementById("modal");
let modalTitle = document.querySelector(".modal-title");

////////////////////////******************/////////////////////////
/// Shuffling cards
/// Shuffle function from http://stackoverflow.com/a/2450976
/*End description*/

shuffle(cardsHolder);
cardsHolder.forEach(function(elem) {
    deck.append(elem);
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

////////////////////////******************/////////////////////////
// Activating the fun
/*---------------------------------------------*/
clickedCard();
modalWindow();
setTimeout(modalWindow, 2000);

////////////////////////******************/////////////////////////
// Preparing functions
/*End description*/

function clickedCard() {
    for (let i = 0; i < cardsHolder.length; i++) {
    	cardsHolder[i].classList.remove("open", "show");
        cardsHolder[i].addEventListener("click", function() {
            cardsHolder[i].classList.add("open", "show");
            openedCards = deck.querySelectorAll(".open");
            for (let i = 0; i < openedCards.length; i++) {
				if (openedCards.length > 1) {
					startMoves();
	            	openedCards[i].classList.remove("open");
		            if ((openedCards[0].innerHTML == openedCards[1].innerHTML)&& (openedCards.length >=2)) {
		            	match();
	            	} else {
	            		unmatch();
	            	}
	            }
        	}
        });
        cardsHolder[i].addEventListener("click", modalWindow);
    }
}
////////////////////////******************/////////////////////////
// Incase of matching
/*End description*/
function match() {
	openedCards[0].classList.add("match");
	openedCards[1].classList.add("match");
}
////////////////////////******************/////////////////////////
// Incase of not matching
/*End description*/
function unmatch() {

	setTimeout(function() {
		///remove classes "open", "show" in the <li>
		openedCards[0].classList.remove("open", "show");
		openedCards[1].classList.remove("open", "show");
		
	}, 150);
}
////////////////////////******************///////////////////////// 
// Setting moves to be incremented every 2 selected cards
/*End description*/
function startMoves() {
	countMoves ();
	startTimer();
	/// hidden 1 star + modalTitle = "Congratulations!!" if moves ==16 
	/// & hidden 2 star + modalTitle = "Don't worry it's ok" if moves ==32 
	if (moves.innerHTML > 16 && moves.innerHTML <= 31) {

/// index the star in array and set my css property
		stars[0].style.cssText = "visibility: hidden"; 
		console.log(stars[0].style.cssText+"Moves "+moves.innerHTML);
/// set my string in title model 
		modalTitle.innerHTML = "Congratulations!!";
	} else if (moves.innerHTML >= 32 && moves.innerHTML <= 64) {
/// index the star in array and set my css property
		stars[2].style.cssText ="visibility: hidden";
/// set my string in title model 
		modalTitle.innerHTML = "Don't worry it's ok";
	}
}

////////////////////////******************/////////////////////////
///counting the moves
/*End description*/
function countMoves (){
	moves.innerHTML = +moves.innerHTML+0.5;
}
////////////////////////******************/////////////////////////
/// start timer function when moves ==1
function startTimer() {
	
	if (moves.innerHTML == 1) {
///https://jsfiddle.net/Daniel_Hug/pvk6p/
		function add() {
		    seconds++;
		    if (seconds >= 60) {
		        seconds = 0;
		        minutes++;
		        if (minutes >= 60) {
		            minutes = 0;
		            hours++;
		        }
		    }
	    
	    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	    timer();
		}
		function timer() {
		    t = setTimeout(add, 1000);
		}
		timer();

	}

}

////////////////////////******************/////////////////////////
/// start modal function will start when matchedCards.length == 16 
function modalWindow() {
	if (matchedCards.length == 16) {
		// Displaying the modal
		modal.classList.add("show");
		// Declare some variables
		let finalTime = time.innerHTML;
		//console.log(finalTime);
        let starRating = document.querySelector(".stars").innerHTML;
        moves = moves.innerHTML;
        // Displaying move, rating and time on modal
        document.getElementById("moves").innerHTML = moves;
        document.getElementById("rating").innerHTML = starRating;
        document.getElementById("time").innerHTML = finalTime;
	}
}
////////////////////////******************/////////////////////////
// Playing Again function
function resetGame() {
    modal.classList.remove("show");
	// Shuffling again
	shuffle(cardsHolder);
    // Remove all existing classes
    for (let i = 0; i < cardsHolder.length; i++) {
    	cardsHolder.forEach.call(cardsHolder, function(item) {
    		deck.appendChild(item);
    	});
    	cardsHolder[i].classList.remove("show", "open", "match");
    }
    // Reset moves
    ///count = 0; uou need use that when you use count in the countMoves fuctoion
    moves.innerHTML = 0;///count;
    // Reset rating
    for (let i= 0; i < stars.length; i++) {
    	///stars[i].style.color = "#FFD700";
    	stars[i].style.visibility = "visible";
	}
	// Reset Timer
	seconds = 0;
	minutes = 0;
	hours = 0;
	time.innerHTML = "0 Min(s) 0 Sec(s)"
	window.location.reload(false);
}




