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

// ===== Muggle Observation Log =====
let reports = [
  { id: 1, text: "Muggle students survive on coffee and instant noodles.", done: false },
  { id: 2, text: "They stare at small glowing rectangles all day.", done: true }
];
let nextReportId = 3;

const reportList = document.getElementById("report-list");
const reportInput = document.getElementById("report-input");
const reportButton = document.getElementById("report-button");
const reportMessage = document.getElementById("report-message");
const reportCount = document.getElementById("report-count");

function showReportMessage(text, isError) {
  reportMessage.textContent = text;

  if (isError) {
    reportMessage.classList.add("error-message");
    reportMessage.classList.remove("success-message");
  } else {
    reportMessage.classList.add("success-message");
    reportMessage.classList.remove("error-message");
  }
}

function renderReports() {
  reportList.replaceChildren();

  for (const report of reports) {
    const card = document.createElement("div");
    card.classList.add("report-card");

    if (report.done) {
      card.classList.add("completed");
    }

    const text = document.createElement("p");
    text.textContent = report.text;

    const doneButton = document.createElement("button");
    doneButton.classList.add("action-button");
    if (report.done) {
      doneButton.textContent = "Undo";
    } else {
      doneButton.textContent = "Observed";
    }
    doneButton.addEventListener("click", () => {
      toggleReport(report.id);
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("action-button");
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", () => {
      removeReport(report.id);
    });

    card.appendChild(text);
    card.appendChild(doneButton);
    card.appendChild(removeButton);
    reportList.appendChild(card);
  }

  const doneCount = reports.filter((report) => report.done).length;
  reportCount.textContent = `Reports observed: ${doneCount} / ${reports.length}`;
}

function addReport() {
  const text = reportInput.value.trim();

  if (text === "") {
    showReportMessage("The report cannot be empty.", true);
  } else if (text.length < 5) {
    showReportMessage("Too short! Write at least 5 characters.", true);
  } else {
    reports.push({ id: nextReportId, text: text, done: false });
    nextReportId++;
    reportInput.value = "";
    showReportMessage("New report filed!", false);
    renderReports();
  }
}

function toggleReport(id) {
  const report = reports.find((report) => report.id === id);

  if (report !== undefined) {
    report.done = !report.done;
    renderReports();
  }
}

function removeReport(id) {
  reports = reports.filter((report) => report.id !== id);
  showReportMessage("Report deleted.", false);
  renderReports();
}

// Click event
reportButton.addEventListener("click", addReport);

// Keyboard event
reportInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addReport();
  }
});

// Focus events
reportInput.addEventListener("focus", () => {
  reportInput.classList.add("input-focus");
});

reportInput.addEventListener("blur", () => {
  reportInput.classList.remove("input-focus");
});

renderReports();