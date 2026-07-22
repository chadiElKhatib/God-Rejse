const movingButton = document.getElementById("movingButton");
const buttonArea = document.getElementById("buttonArea");
const messageText = document.getElementById("messageText");

const gameSection = document.getElementById("gameSection");
const countdownSection = document.getElementById("countdownSection");
const countdownElement = document.getElementById("countdown");

const finalSection = document.getElementById("finalSection");
const flyingLetters = document.getElementById("flyingLetters");

const messages = [
  "Årh, du var tæt på 😇",
  "Næsten! Prøv igen 🌸",
  "Lidt hurtigere næste gang 😂",
  "Du giver vel ikke op allerede? 💗",
  "Okay, den var virkelig tæt på ✨",
  "Jeg tror knappen driller dig lidt 🤭",
  "Bare én gang til...",
  "Ej jeg er forpustet 😮‍💨 Nu kan du trykke!"
];

let moveCount = 0;
let canClick = false;

function moveButton() {
  if (canClick) {
    return;
  }

  const areaWidth = buttonArea.clientWidth;
  const areaHeight = buttonArea.clientHeight;

  const buttonWidth = movingButton.offsetWidth;
  const buttonHeight = movingButton.offsetHeight;

  const padding = 10;

  const maxX = areaWidth - buttonWidth - padding;
  const maxY = areaHeight - buttonHeight - padding;

  const randomX =
    padding + Math.random() * Math.max(maxX - padding, 0);

  const randomY =
    padding + Math.random() * Math.max(maxY - padding, 0);

  movingButton.style.left = `${randomX}px`;
  movingButton.style.top = `${randomY}px`;
  movingButton.style.transform = "translate(0, 0)";

  messageText.textContent =
    messages[Math.min(moveCount, messages.length - 1)];

  moveCount++;

  if (moveCount >= messages.length) {
    canClick = true;

    movingButton.textContent = "Nu kan du trykke 💗";

    movingButton.style.left = "50%";
    movingButton.style.top = "50%";
    movingButton.style.transform = "translate(-50%, -50%)";

    messageText.textContent =
      "Ej jeg er forpustet 😮‍💨 Nu kan du trykke!";

    movingButton.style.background =
      "linear-gradient(135deg, #e2639a, #bd74df)";
  }
}

movingButton.addEventListener("mouseenter", moveButton);

movingButton.addEventListener(
  "touchstart",
  function (event) {
    if (!canClick) {
      event.preventDefault();
      moveButton();
    }
  },
  { passive: false }
);

movingButton.addEventListener("click", function () {
  if (!canClick) {
    moveButton();
    return;
  }

  startCountdown();
});

function startCountdown() {
  gameSection.classList.add("hidden");
  countdownSection.classList.remove("hidden");

  let number = 3;

  countdownElement.textContent = number;

  const countdownInterval = setInterval(function () {
    number--;

    if (number > 0) {
      countdownElement.textContent = number;

      countdownElement.style.animation = "none";

      void countdownElement.offsetWidth;

      countdownElement.style.animation =
        "countdownPulse 1s ease";
    } else {
      clearInterval(countdownInterval);

      countdownSection.classList.add("hidden");

      showFinalMessage();
    }
  }, 1000);
}

async function showFinalMessage() {
  finalSection.classList.remove("hidden");

  await showIntroMessage(
  "Hej Lina... 🌸"
);

await showIntroMessage(
  "Jeg håber, du er klar til en lille overraskelse..."
);

await showIntroMessage(
  "Du spurgte, hvorfor jeg ikke skriver til dig..."
);

await showIntroMessage(
  "Sandheden er, at jeg bare ventede på den rigtige måde at gøre det på 💗"
);

  flyingLetters.innerHTML = "";
  flyingLetters.classList.remove("fade-out");
  flyingLetters.style.opacity = "1";
  flyingLetters.style.transform = "translateY(0)";

  void flyingLetters.offsetWidth;

  const finalMessage =
    "God rejse Lina 🌸 Pas godt på jer selv og nyd jeres ferie. Og ja… nu har jeg skrevet til dig 💗";

  createFlyingMessage(finalMessage);
}

async function showIntroMessage(message) {
  flyingLetters.innerHTML = "";
  flyingLetters.classList.remove("fade-out");
  flyingLetters.style.opacity = "1";
  flyingLetters.style.transform = "translateY(0)";

  const introText = document.createElement("p");
  introText.classList.add("intro-message");
  introText.textContent = message;

  flyingLetters.appendChild(introText);

  await wait(2400);

  flyingLetters.classList.add("fade-out");

  await wait(700);

  flyingLetters.innerHTML = "";
  flyingLetters.classList.remove("fade-out");
}

function createFlyingMessage(message) {
  flyingLetters.innerHTML = "";

  const words = message.split(" ");
  let totalLetterIndex = 0;

  words.forEach(function (word) {
    const wordElement = document.createElement("span");
    wordElement.classList.add("word");

    [...word].forEach(function (character) {
      const letter = document.createElement("span");

      letter.classList.add("letter");
      letter.textContent = character;

      const randomX =
        Math.random() * window.innerWidth * 2 -
        window.innerWidth;

      const randomY =
        Math.random() * window.innerHeight * 2 -
        window.innerHeight;

      const randomRotation =
        Math.random() * 720 - 360;

      letter.style.setProperty(
        "--start-x",
        `${randomX}px`
      );

      letter.style.setProperty(
        "--start-y",
        `${randomY}px`
      );

      letter.style.setProperty(
        "--rotation",
        `${randomRotation}deg`
      );

      letter.style.setProperty(
        "--delay",
        `${totalLetterIndex * 0.035}s`
      );

      wordElement.appendChild(letter);

      totalLetterIndex++;
    });

    flyingLetters.appendChild(wordElement);
  });
}

function wait(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}