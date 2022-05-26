// Declare and store player's info in a object called player
let player = {
  name: "xDelmo",
  chips: 145,
};

// Declare a variable called cards and assign its value to an empty array
let cards = [];
// Declare a variable called sum and assign its value to 0
let sum = 0;

let hasBlackJack = false;
let isAlive = false;

// Declare a variable called message and assign its value to an empty string
let message = "";

// Store the message-el paragraph in a variable called messageEl
let messageEl = document.getElementById("message-el");

// console.log(sum);

// Store the sum paragraph in a variable called sumEl
let sumEl = document.getElementById("sum-el");

// Store the cards paragraph in a variable called cardsEl
let cardsEl = document.getElementById("cards-el");

// Store the player's info in a variable called playerEl
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

// Create a function, getRandomCard() that return a random number between 2-13
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  // console.log(randomNumber);

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
  isAlive = true;
  // BUG SOLVED! When you got Blackjack you couldn't drawn a card in next new games
  // Re-assign hasBlackJack to false every new game
  hasBlackJack = false;

  // Generate two random numbes
  // Use the getRandomCard() to set the value of first and second cards
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();

  // Re-assign the cards and sum variables so that the game can start
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  renderGame();
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
  } else {
    // Reassign the message variable
    message = "You're out of the game!";
    isAlive = false;
  }

  // Display the message in the messageEl using messageEl.textContent
  messageEl.textContent = message;
}

// Create a function newCard() that create a new card and add its value to sum variable

function newCard() {
  // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
  if (isAlive === true && hasBlackJack === false) {
    // console.log("Drawing a new card from the deck!");

    // Create a card variable and get a random number
    let card = getRandomCard();
    // console.log(card);

    // Add the new card to the sum variable
    sum += card;
    // console.log(sum);
    // Push the card to the cards array
    cards.push(card);
    // console.log(cards);

    // Call renderGame()
    renderGame();
  }
}

// console.log("blackjack:" + hasBlackJack);
// console.log("alive:" + isAlive);
