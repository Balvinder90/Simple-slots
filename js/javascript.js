// DECLARE GAME VARIABLES
const betOne = 100;
const betTwo = 200;
const betThree = 300;
const smileyWinnings = 600;
const bellWinnings = 700;
const diceWinnings = 1000;
const cherryWinnings = 2000;
const sevenWinnings = 5000;
let currentBet = null;
let rotate = 0;
let winSoundMP3 = new Audio("./sound/win.mp3");
let winSoundOGG = new Audio("./sound/win.ogg");

// SLOT IMAGES ARRAY
const slotImages = [
  `<img src="img/smiley.png" alt="Smiley" title="Smiley" data-winnings="${smileyWinnings}"/>`,
  `<img src="img/bell.png" alt="Bell" title="Bell" data-winnings="${bellWinnings}"/>`,
  `<img src="img/dice.png" alt="Dice" title="Dice" data-winnings="${diceWinnings}"/>`,
  `<img src="img/cherry.png" alt="Cherry" title="Cherry" data-winnings="${cherryWinnings}"/>`,
  `<img src="img/seven.png" alt="Seven" title="Seven" data-winnings="${sevenWinnings}"/>`,
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
betButtons[0].innerText = betOne;
betButtons[1].innerText = betTwo;
betButtons[2].innerText = betThree;

// PAYOUT SECTION UI DATA
payOutInfo[0].querySelector("h3").innerText = `${smileyWinnings} Credits`;
payOutInfo[1].querySelector("h3").innerText = `${bellWinnings} Credits`;
payOutInfo[2].querySelector("h3").innerText = `${diceWinnings} Credits`;
payOutInfo[3].querySelector("h3").innerText = `${cherryWinnings} Credits`;
payOutInfo[4].querySelector("h3").innerText = `${sevenWinnings} Credits`;

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
  if (winSoundMP3.canPlayType("audio/mpeg")) {
    winSoundMP3.volume = 0.1;
    winSoundMP3.play();
  } else {
    winSoundOGG.volume = 0.1;
    winSoundOGG.play();
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
    if (
      slots[0].querySelector("img").title === "Smiley" &&
      slots[1].querySelector("img").title === "Smiley" &&
      slots[2].querySelector("img").title === "Smiley"
    ) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (
      slots[0].querySelector("img").title === "Bell" &&
      slots[1].querySelector("img").title === "Bell" &&
      slots[2].querySelector("img").title === "Bell"
    ) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (
      slots[0].querySelector("img").title === "Dice" &&
      slots[1].querySelector("img").title === "Dice" &&
      slots[2].querySelector("img").title === "Dice"
    ) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (
      slots[0].querySelector("img").title === "Cherry" &&
      slots[1].querySelector("img").title === "Cherry" &&
      slots[2].querySelector("img").title === "Cherry"
    ) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
    if (
      slots[0].querySelector("img").title === "Seven" &&
      slots[1].querySelector("img").title === "Seven" &&
      slots[2].querySelector("img").title === "Seven"
    ) {
      updateCredits(
        bet,
        Number(slots[0].querySelector("img").getAttribute("data-winnings"))
      );
    }
  }, 1000);

  // THIS GOES AT THE END WHEN THE SLOTS HAVE FINISHED SPINNING
  currentBet = null;
};

// FUNCTION CHECK TO SEE WHETHER A BET HAS BEEN SELECTED
const isBetTrue = () => {
  if (
    currentBet === betOne ||
    currentBet === betTwo ||
    currentBet === betThree
  ) {
    rotate += 360;
    selectBet.forEach((bet) => {
      bet.classList.add("d-none");
      makeBet.style.rotate = `${rotate}deg`;
      betButtons.forEach((bet) => {
        bet.classList.remove("bet-amount-checked");
      });
    });
    change.innerText = `-${currentBet}`;
    change.classList.add("credit-change");
    changeSlots(currentBet);
  } else {
    selectBet.forEach((bet) => {
      bet.classList.remove("d-none");
    });
  }
};

// FUNCTION TO ADD/REMOVE CLASS ON CURRENT BET AND SET A VALUE TO THE CURRENT BET VARIABLE
const setBet = (e) => {
  currentBet = Number(e.target.innerText);
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
  if (e.target.innerText === betOne.toString()) {
    setBet(e);
  }
  if (e.target.innerText === betTwo.toString()) {
    setBet(e);
  }
  if (e.target.innerText === betThree.toString()) {
    setBet(e);
  }
  if (e.target.className === "reset-credits") {
    localStorage.clear();
    credits.innerText = 5000;
    selectBet.forEach((bet) => {
      bet.classList.add("d-none");
    });
    betButtons.forEach((bet) => {
      bet.classList.remove("bet-amount-checked");
    });
  }
});