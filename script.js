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

// ALOHOMORA INTERACTIVE GAME
const pieces = document.querySelectorAll(".piece");
const slots = document.querySelectorAll(".slot");
const mainArea = document.querySelector("main");
const gameMessage = document.getElementById("game-message");
const gameCount = document.getElementById("game-count");
const lockSection = document.getElementById("lock-section");
const orbSection = document.getElementById("fact-section");
const orbMessage = document.getElementById("orb-message");
const answers = {
  "slot-1": "piece-a",
  "slot-2": "piece-lo",
  "slot-3": "piece-ho",
  "slot-4": "piece-mo",
  "slot-5": "piece-ra"
};

let placedCount = 0;

pieces.forEach((piece) => {
  piece.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", piece.id);
  });
});

function unlockOrb() {
  lockSection.classList.add("hidden");
  orbSection.classList.remove("hidden");
  orbMessage.textContent = "🔓 Alohomora! The lock opened. You can now explore the Orb!";
}

slots.forEach((slot) => {
  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  slot.addEventListener("drop", (event) => {
    event.preventDefault();

    const pieceId = event.dataTransfer.getData("text/plain");
    const piece = document.getElementById(pieceId);

    if (answers[slot.id] === pieceId) {
      slot.appendChild(piece);
      piece.draggable = false;
      placedCount++;
      gameCount.textContent = `Pieces placed: ${placedCount} / ${slots.length}`;
      gameMessage.textContent = "Correct!";
      gameMessage.classList.remove("error-message");

      if (placedCount === slots.length) {
        unlockOrb();
      }
    } else {
      gameMessage.textContent = "Wrong slot! Try again.";
      gameMessage.classList.add("error-message");
      mainArea.classList.add("shake");
    }
  });
});

mainArea.addEventListener("animationend", () => {
  mainArea.classList.remove("shake");
});

// NEW APIs: Wizarding World API for Spells
const spellInput = document.getElementById("spell-input");
const spellSearchButton = document.getElementById("spell-search-button");
const spellRandomButton = document.getElementById("spell-random-button");
const spellResult = document.getElementById("spell-result");

function showSpell(spell) {
  spellResult.innerHTML = "";
  spellResult.classList.remove("error-message");

  const card = document.createElement("div");
  card.classList.add("spell-card");

  const name = document.createElement("h3");
  name.textContent = spell.name;

  const incantation = document.createElement("p");
  incantation.textContent = "Incantation: " + (spell.incantation || "None");

  const type = document.createElement("p");
  type.textContent = "Type: " + (spell.type || "Unknown");

  const light = document.createElement("p");
  light.textContent = "Light: " + (spell.light || "None");

  const effect = document.createElement("p");
  effect.textContent = "Effect: " + (spell.effect || "Unknown");

  card.appendChild(name);
  card.appendChild(incantation);
  card.appendChild(type);
  card.appendChild(light);
  card.appendChild(effect);
  spellResult.appendChild(card);
}

function showSpellError(message) {
  spellResult.textContent = message;
  spellResult.classList.add("error-message");
}

async function loadSpell(url, random) {
  spellResult.classList.remove("error-message");
  spellResult.textContent = "Searching the spellbook...";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const spells = await response.json();

    if (spells.length === 0) {
      showSpellError("Hmm... Maybe I haven't noted that spell down. Try another one!");
      return;
    }

    let chosenSpell = spells[0];
    if (random) {
      const randomIndex = parseInt(Math.random() * spells.length);
      chosenSpell = spells[randomIndex];
    }

    showSpell(chosenSpell);
  } catch (error) {
    console.error("Unable to retrieve spell:", error);
    showSpellError("The spellbook is unavailable right now. Please try again later.");
  }
}

function searchSpell() {
  const searchName = spellInput.value.trim();

  if (searchName === "") {
    showSpellError("Please enter a spell name.");
    return;
  }

  const url = "https://wizard-world-api.herokuapp.com/Spells?Name=" + encodeURIComponent(searchName);
  loadSpell(url, false);
}

function randomSpell() {
  loadSpell("https://wizard-world-api.herokuapp.com/Spells", true);
}

spellSearchButton.addEventListener("click", searchSpell);
spellRandomButton.addEventListener("click", randomSpell);