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

// Detect when dragging begins on ALL pieces
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

// Allow pieces to be dropped onto slots
slots.forEach((slot) => {
  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  slot.addEventListener("drop", (event) => {
    event.preventDefault();

    const pieceId = event.dataTransfer.getData("text/plain");
    const piece = document.getElementById(pieceId);

    if (answers[slot.id] === pieceId) {
      // Correct: move the piece into the slot and lock it
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
      // Wrong: the piece stays where it was, the screen shakes
      gameMessage.textContent = "Wrong slot! Try again.";
      gameMessage.classList.add("error-message");
      mainArea.classList.add("shake");
    }
  });
});

// Remove the shake class when the animation ends so it can shake again
mainArea.addEventListener("animationend", () => {
  mainArea.classList.remove("shake");
});


// Wand cursor
const wand = document.getElementById("wand");
const wandTip = document.getElementById("wand-tip");

function moveWand(event) {
  wand.style.left = event.clientX + "px";
  wand.style.top = event.clientY + "px";
}

document.addEventListener("mousemove", moveWand);
document.addEventListener("dragover", moveWand);

// Wands light up
const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  button.addEventListener("mousedown", () => {
    wandTip.classList.add("glow");
  });
});

document.addEventListener("mouseup", () => {
  wandTip.classList.remove("glow");
});