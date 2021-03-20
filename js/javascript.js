// DECLARE GAMESTATE OBJECT
const gameState = {
  betOne: 100,
  betTwo: 200,
  betThree: 300,
  currentBet: null,
  smileyWinnings: 600,
  bellWinnings: 700,
  diceWinnings: 1000,
  cherryWinnings: 2000,
  sevenWinnings: 5000,
  rotate: 0,
  winSoundMP3: new Audio("./sound/win.mp3"),
  winSoundOGG: new Audio("./sound/win.ogg"),
};

// SLOT IMAGES ARRAY
const slotImages = [
  `<img src="img/smiley.png" alt="Smiley" title="Smiley" data-winnings="${gameState.smileyWinnings}"/>`,
  `<img src="img/bell.png" alt="Bell" title="Bell" data-winnings="${gameState.bellWinnings}"/>`,
  `<img src="img/dice.png" alt="Dice" title="Dice" data-winnings="${gameState.diceWinnings}"/>`,
  `<img src="img/cherry.png" alt="Cherry" title="Cherry" data-winnings="${gameState.cherryWinnings}"/>`,
  `<img src="img/seven.png" alt="Seven" title="Seven" data-winnings="${gameState.sevenWinnings}"/>`,
];

// DECLARE UI VARIABLES
const credits = document.querySelector(".credits");
const makeBet = document.querySelector(".make-bet");
const slots = document.querySelectorAll(".slot");
const betButtons = document.querySelectorAll("button");
const selectBet = document.querySelectorAll(".select-bet");
const betAmount = document.querySelectorAll(".bet-Amount");
const change = document.querySelector(".change");
const payOutInfo = document.querySelectorAll(".payout-info");

// BET BUTTONS UI DATA
betButtons[0].innerText = gameState.betOne;
betButtons[1].innerText = gameState.betTwo;
betButtons[2].innerText = gameState.betThree;

// PAYOUT SECTION UI DATA
payOutInfo[0].querySelector(
  "h3"
).innerText = `${gameState.smileyWinnings} Credits`;
payOutInfo[1].querySelector(
  "h3"
).innerText = `${gameState.bellWinnings} Credits`;
payOutInfo[2].querySelector(
  "h3"
).innerText = `${gameState.diceWinnings} Credits`;
payOutInfo[3].querySelector(
  "h3"
).innerText = `${gameState.cherryWinnings} Credits`;
payOutInfo[4].querySelector(
  "h3"
).innerText = `${gameState.sevenWinnings} Credits`;

// LOCAL STORAGE CHECK
if (localStorage.length) {
  credits.innerText = localStorage.getItem("localCredits");
}

// RANDOM SLOT IMAGES WHEN GAME LOADS
slots.forEach((slot) => {
  slot.innerHTML = slotImages[Math.floor(slotImages.length * Math.random())];
});

// HOVER FUNCTIONS ON MAKE BET BUTTONS
makeBet.addEventListener("mouseover", function () {
  this.querySelector("img").setAttribute("src", "./img/bet-hover.png");
});
makeBet.addEventListener("mouseout", function () {
  this.querySelector("img").setAttribute("src", "./img/bet-no-hover.png");
});

// UPDATE CREDITS FUNCTION
const updateCredits = (bet, earnings) => {
  // CAN THE BROWSER SUPPORT MP3
  if (gameState.winSoundMP3.canPlayType("audio/mpeg")) {
    gameState.winSoundMP3.volume = 0.1;
    gameState.winSoundMP3.play();
  } else {
    gameState.winSoundOGG.volume = 0.1;
    gameState.winSoundOGG.play();
  }
  let totalWinnings = earnings * (bet / 100);
  let currentCredits = Number(credits.innerText);
  currentCredits += totalWinnings;
  change.innerText = `+${totalWinnings}`;
  credits.innerText = currentCredits;
  localStorage.setItem("localCredits", credits.innerText);
  change.classList.add("credit-change");
  setTimeout(() => {
    change.classList.remove("credit-change");
  }, 1000);
};

// CHECK IF THERE ARE THREE MATCHINGS SLOTS FUNCTION
const isMatch = (slot) => {
  if (
    slots[0].querySelector("img").title === slot &&
    slots[1].querySelector("img").title === slot &&
    slots[2].querySelector("img").title === slot
  ) {
    return true;
  }
};

// SLOT FUNCTIONS
const changeSlots = (bet) => {
  setTimeout(() => {
    change.classList.remove("credit-change");
  }, 500);
  credits.innerText -= bet;
  localStorage.setItem("localCredits", credits.innerText);

  slots.forEach((slot) => {
    slot.querySelector("img").classList.add("slot-img-effect");
  });

  setTimeout(() => {
    slots.forEach((slot) => {
      slot.innerHTML =
        slotImages[Math.floor(slotImages.length * Math.random())];
    });
    if (isMatch("Smiley")) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (isMatch("Bell")) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (isMatch("Dice")) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (isMatch("Cherry")) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (isMatch("Seven")) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
  }, 1000);

  // THIS GOES AT THE END WHEN THE SLOTS HAVE FINISHED SPINNING
  gameState.currentBet = null;
};

// FUNCTION CHECK TO SEE WHETHER A BET HAS BEEN SELECTED
const isBetTrue = () => {
  if (
    gameState.currentBet === gameState.betOne ||
    gameState.currentBet === gameState.betTwo ||
    gameState.currentBet === gameState.betThree
  ) {
    gameState.rotate += 360;
    selectBet.forEach((bet) => {
      bet.classList.add("d-none");
      makeBet.style.rotate = `${gameState.rotate}deg`;
      betButtons.forEach((bet) => {
        bet.classList.remove("bet-amount-checked");
      });
    });
    change.innerText = `-${gameState.currentBet}`;
    change.classList.add("credit-change");
    changeSlots(gameState.currentBet);
  } else {
    selectBet.forEach((bet) => {
      bet.classList.remove("d-none");
    });
  }
};

// FUNCTION TO ADD/REMOVE CLASS ON CURRENT BET AND SET A VALUE TO THE CURRENT BET VARIABLE
const setBet = (e) => {
  gameState.currentBet = Number(e.target.innerText);
  betButtons.forEach((bet) => {
    bet.classList.remove("bet-amount-checked");
  });
  e.target.classList.add("bet-amount-checked");
  selectBet.forEach((bet) => {
    bet.classList.add("d-none");
  });
};

// SINGLE CLICK EVENT ON DOCUMENT BODY
document.querySelector("body").addEventListener("click", (e) => {
  if (e.target === makeBet || e.target.title === "Make bet") {
    isBetTrue();
  }
  if (e.target.innerText === gameState.betOne.toString()) {
    setBet(e);
  }
  if (e.target.innerText === gameState.betTwo.toString()) {
    setBet(e);
  }
  if (e.target.innerText === gameState.betThree.toString()) {
    setBet(e);
  }
  if (e.target.className === "reset-credits") {
    localStorage.clear();
    credits.innerText = 5000;
    gameState.currentBet = null;
    selectBet.forEach((bet) => {
      bet.classList.add("d-none");
    });
    betButtons.forEach((bet) => {
      bet.classList.remove("bet-amount-checked");
    });
  }
});
