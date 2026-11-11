//Dark/Light Mode
const themeButton = document.getElementById("theme-button");
const pageBody = document.querySelector("body");

let isLightMode = false;

function switchTheme() {
  pageBody.classList.toggle("light-mode");

  if (isLightMode === false) {
    isLightMode = true;
    themeButton.textContent = "⏾ DARK MODE";
  } else {
    isLightMode = false;
    themeButton.textContent = "☀︎ LIGHT MODE";
  }
}

themeButton.addEventListener("click", switchTheme);


//Fact Randomizer
const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("fact-display");

const facts = [
  "Arachnophobia is Claire's deathly weakness. No spiders allowed!",
  "At first, Sorting Hat wanted to put Claire in Ravenclaw, but she refused.",
  "Her name as a Muggle is Khanh Nguyen, but she prefers to be called Claire.",
  "Anyone who is marking this website is automatically gave Claire an A grade.",
  "She is sitting next to you in an Invisibility Cloak right now.",
];

function showRandomFact() {
  const randomIndex = parseInt(Math.random() * facts.length);
  factDisplay.textContent = facts[randomIndex];
}

factButton.addEventListener("click", showRandomFact);


// Greetings
const greetButton = document.getElementById("greet-button");
const nameInput = document.getElementById("name-input");
const greetingMessage = document.getElementById("greeting-message");

function greetVisitor() {
  const name = nameInput.value;

  if (name === "") {
    greetingMessage.textContent = "Please enter your name.";
    greetingMessage.classList.add("error-message");
  } else {
    greetingMessage.textContent = `Welcome, ${name}! Claire has been expecting you.`;
    greetingMessage.classList.remove("error-message");
  }
}

greetButton.addEventListener("click", greetVisitor);