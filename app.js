/*


*/
var scores, roundScore, activePlayer, gamePlaying;

init(); //call init function

//DOM manipulation

//current score 
//document.querySelector('#current-' + activePlayer).textContent = dice; //just plain text 

// ADDING HTML TO THE DOM 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; 

//click event
document.querySelector('.btn-roll').addEventListener('click', function(){
    //if the game is actually playing
    if(gamePlaying){
        //1. Random number
        //calculate random number for the score. .floor removes decimals, .random picks a random number between 1 and 6.
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //display the right img for the dice
        diceDOM.src = 'dice-' + dice + '.png';
    

        //3. Update the round score IF the rolled number was NOT a 1 
        if (dice !== 1){
            //add score
            //1. update roundScore
            roundScore += dice; //roundScore = roundScore + dice;
            //2. display roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer(); //call the function nextPlayer
        }
    }  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //if the game is actually active
    if (gamePlaying){
        //1. add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore; //scores[activePlayer] = scores[activePlayer] + roundScore;

        //Update the UI user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //set the state var to false, where we detect if a player win the game
            gamePlaying = false;
        } else {
            //if the game continues
            //nextplayer
            nextPlayer(); //call the function nextPlayer
        } 
    }
});

function nextPlayer(){
    //next player
    //ternary operator: if activeplayer = 0 then activeplayer = 1 else activeplayer = 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //set roundScore back to zero
    roundScore = 0;
    
    //set current score to 0 when they loose the round
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //setting active class for the player who's playing
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide the dice when it's the turn of the other player
    document.querySelector('.dice').style.display = 'none';
}

//new game 
document.querySelector('.btn-new').addEventListener('click', init);

//function initialise the game
function init(){
    //initial scores for each players
    scores = [0,0];
    //variable for the round score
    roundScore = 0;
    //current active player
    activePlayer = 0;
    //set var to true
    gamePlaying = true;
    //hiding the dice 
    document.querySelector('.dice').style.display = 'none';
    //setting the values to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    //set the names back to the initial state
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //add active class back to the first one
    document.querySelector('.player-0-panel').classList.add('active');
}











































