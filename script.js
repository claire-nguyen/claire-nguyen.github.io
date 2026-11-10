//Dark/Light Mode
const themeButton = document.getElementById("theme-button");
const pageBody = document.querySelector("body");

function switchTheme() {
  pageBody.classList.toggle("light-mode");
}

themeButton.addEventListener("click", switchTheme);


//Fact Randomizer
const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("fact-display");

const facts = [
  "Claire's patronus is an osprey.",
  "She plays both the violin and the piano.",
  "She speaks French and Japanese.",
  "She can guess every spice in a soup on the first sip, even if she hates cooking.",
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