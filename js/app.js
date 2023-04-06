const colorModeBtn = document.getElementById("modeBtn");
const body = document.getElementById("body");

//label (form)
const dayLabel = document.getElementById("dayLabel");
const monthLabel = document.getElementById("monthLabel");
const yearLabel = document.getElementById("yearLabel");

//input (form)
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const form = document.getElementById("form");

//error elements
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

//display elements
const dayDisplay = document.getElementById("dayDisplay");
const monthDisplay = document.getElementById("monthDisplay");
const yearDisplay = document.getElementById("yearDisplay");

//store error state
let error = false;

//  handle Inputs

// handle day input
dayInput.addEventListener("input", (e) => {
  const dayValue = parseInt(e.target.value);
  if (dayValue > 31 || dayValue < 1) {
    dayError.innerText = "Must be a valid day";
    dayLabel.classList.add("errorInputDisplay");
    error = true;
  } else {
    dayError.innerText = "";
    dayLabel.classList.remove("errorInputDisplay");
    error = false;
  }
});

// handle Month input

monthInput.addEventListener("input", (e) => {
  const monthValue = parseInt(e.target.value);
  if (monthValue > 12 || monthValue < 1) {
    monthError.innerText = "Must be a valid month";
    monthLabel.classList.add("errorInputDisplay");
    error = true;
  } else {
    monthError.innerText = "";
    monthLabel.classList.remove("errorInputDisplay");
    error = false;
  }
});

// handle Year Input

yearInput.addEventListener("input", (e) => {
  const currentYear = new Date().getFullYear();
  const yearValue = parseInt(e.target.value);
  if (yearValue > currentYear || yearValue < 0) {
    yearError.innerText = "Must be in the past";
    yearLabel.classList.add("errorInputDisplay");
    error = true;
  } else {
    yearError.innerText = "";
    yearLabel.classList.remove("errorInputDisplay");
    error = false;
  }
});

// year length error handling
yearInput.addEventListener("focusout", (e) => {
  const yearValue = e.target.value;
  if (yearValue.length !== 4) {
    yearError.innerText = "Must be a valid year";
    yearLabel.classList.add("errorInputDisplay");
    error = true;
  } else {
    yearError.innerText = "";
    yearLabel.classList.remove("errorInputDisplay");
    error = false;
  }
});

// check date with months
const dateInMonth = (dayInput, monthInput, error) => {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);

  if (!error) {
    if (month % 2 === 0 && day > 30) {
      dayError.innerText = "Must be a valid day";
      dayLabel.classList.add("errorInputDisplay");
      error = true;
    } else if (month === 2 && day > 29) {
      dayError.innerText = "Must be a valid day";
      dayLabel.classList.add("errorInputDisplay");
      error = true;
    } else {
      dayError.innerText = "";
      dayLabel.classList.remove("errorInputDisplay");
      error = false;
    }
  } else {
    return;
  }
};

// handle day and month input focus
monthInput.addEventListener("focusout", () => {
  if (dayInput.value !== "") {
    dateInMonth(dayInput, monthInput, error);
  } else {
    return;
  }
});
dayInput.addEventListener("focusout", () => {
  if (monthInput.value !== "") {
    dateInMonth(dayInput, monthInput, error);
  } else {
    return;
  }
});

//calculate age
const calculateAge = (dayInput, monthInput, yearInput) => {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Set the date to September 24, 1984
  const date1 = new Date(year, month, day);

  // Get today's date
  const date2 = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = date2.getTime() - date1.getTime();

  // Convert the difference to years, months, and days
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
  const diffInMonths = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)
  );
  const diffInDays = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
  );

  // Display the difference
  dayDisplay.innerText = diffInDays;
  monthDisplay.innerText = diffInMonths;
  yearDisplay.innerText = diffInYears;
};

// handle submitBtn
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (error) {
    return;
  } else {
    calculateAge(dayInput, monthInput, yearInput);
  }
});

// theme button
colorModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
});
