// Declare and store player's info in a object called player
let player = {
  name: "xDelmo",
  chips: 200,
};

// Declare a variable called cards and assign its value to an empty array
let cards = [];
// Declare a variable called sum and assign its value to 0
let sum = 0;

// Declare a variable called bet and assign its value to 20
let bet = 20;
// Declare a variable called prize and assign its value to triple the bet
let prize = bet * 3;

// Declare a variable called hasBlackJack and assign its value to false
let hasBlackJack = false;
// Declare a variable called isAlive and assign its value to false
let isAlive = false;

// Declare a variable called message and assign its value to an empty string
let message = "";

// Store the message-el paragraph in a variable called messageEl
let messageEl = document.getElementById("message-el");

// Store the sum paragraph in a variable called sumEl
let sumEl = document.getElementById("sum-el");

// Store the cards paragraph in a variable called cardsEl
let cardsEl = document.getElementById("cards-el");

// Store the player's info in a variable called playerEl
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

// Store start button in a variable called buttonStartEL
let buttonStartEL = document.getElementById("btn-start-el");
// Store draw button in a variable called buttonDrawEL
let buttonDrawEL = document.getElementById("btn-draw-el");

// Create a function getRandomCard() that return a random number between 2-13
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  // if 1     -> return 11
  // if 11-13 -> return 10
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

// Create a new function called startGame() that assign the first 2 cards and calls renderGame()
function startGame() {
  if (player.chips >= bet) {
    isAlive = true;
    // BUG SOLVED! When you got Blackjack you couldn't drawn a card in next new games
    // Re-assign hasBlackJack to false every new game
    hasBlackJack = false;
    // Call updateChips()
    updateChips();
    displayButtons();
    // Generate two random numbes
    // Use the getRandomCard() to set the value of first and second cards
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();

    // Re-assign the cards and sum variables so that the game can start
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;

    renderGame();
  } else {
    // Reassign the message variable
    message = "You don't have enough chips!";
    messageEl.textContent = message;
  }
}

function renderGame() {
  // Render the cars on the page
  cardsEl.textContent = "Cards: ";

  // Create a for loop that renders out all the cards instead of just two
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  // Render the sum on the page
  sumEl.textContent = "Sum: " + sum;

  if (sum <= 20) {
    // Reassign the message variable
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    // Reassign the message variable
    message = "You've got Blackjack!";
    hasBlackJack = true;
    isAlive = false;
    // Call updateChips()
    updateChips();
  } else {
    // Reassign the message variable
    message = "You're out of the game!";
    isAlive = false;
  }

  // Display the message in the messageEl using messageEl.textContent
  messageEl.textContent = message;
  displayButtons();
}

// Create a function newCard() that create a new card and add its value to sum variable
function newCard() {
  // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
  if (isAlive === true && hasBlackJack === false) {
    // Create a card variable and get a random number
    let card = getRandomCard();

    // Add the new card to the sum variable
    sum += card;
    // Push the card to the cards array
    cards.push(card);

    // Call renderGame()
    renderGame();
  }
}

//NEW FUNCTION 1.1
// Create a function updateChips() that
function updateChips() {
  if (hasBlackJack === true && isAlive === false) {
    // Add prize to player's chips everytime he gets Blackjack
    player.chips += prize;
    playerEl.textContent = player.name + ": $" + player.chips;
  } else if (hasBlackJack === false && isAlive === true) {
    // Remove bet to player's chips everytime he starts a new game
    player.chips -= bet;
    playerEl.textContent = player.name + ": $" + player.chips;
  }
}

//NEW FUNCTION 1.2
// Create a function displayButtons() that displays or hides buttons according to player's state
function displayButtons() {
  if (isAlive === false) {
    // Change display property to draw button hiding it when game is over
    buttonDrawEL.style.display = "none";
  } else {
    buttonDrawEL.style.display = "block";
  }
  if (player.chips < bet || isAlive === true) {
    // Change display property to start button hiding when player's chips are not enough
    buttonStartEL.style.display = "none";
  } else {
    // Change display property to start button displaying it otherwise
    buttonStartEL.style.display = "block";
  }
}
