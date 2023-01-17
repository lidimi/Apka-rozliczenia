const gross = document.querySelector("#gross");
const card = document.querySelector("#card");
const displayCash = document.querySelector(".display-cash-display");

// DISPLAY CASH EARNINGS
document.querySelector(".inputs").addEventListener("input", (e) => {
  if (e.target.id === "gross" || e.target.id === "card") {
    displayCash.textContent =
      Number(gross.value - card.value).toFixed(2) + " zł";
  }
});

//DISPLAY HELPERS

document.querySelector(".form").addEventListener("mouseover", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    e.target.parentElement.nextElementSibling.classList.remove("hide");
  }
});

// REMOVE HELPERS

document.querySelector(".form").addEventListener("mouseout", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    e.target.parentElement.nextElementSibling.classList.add("hide");
  }
});

// DISPLAY HIDDEN INPUTS

const returnsInput = document.querySelector("#returns-amount");
const fvInput = document.querySelector("#fv-amount");
const returnHidden = document.querySelector(".return-hidden");
const fvHidden = document.querySelector(".fv-hidden");

document.querySelector(".fieldsets").addEventListener("input", (e) => {
  if (e.target.value === "returns-yes") {
    returnHidden.style.visibility = "visible";
    returnsInput.setAttribute("required", "true");
  } else if (e.target.value === "fv-yes") {
    fvHidden.style.visibility = "visible";
    fvInput.setAttribute("required", "true");
  } else if (e.target.value === "returns-no") {
    returnHidden.style.visibility = "hidden";
    returnsInput.removeAttribute("required");
    returnsInput.value = "";
  } else if (e.target.value === "fv-no") {
    fvHidden.style.visibility = "hidden";
    fvInput.removeAttribute("required");
    fvInput.value = "";
  }
});

// CALCULATE OUTPUT & DEFFERENCE

function isCorrect() {
  const prevMonth = document.querySelector("#prev-month");
  const currentMonth = document.querySelector("#current-month");
  const curier = document.querySelector("#KW");
  const cashEarnings = parseFloat(gross.value - card.value);
  const total = parseFloat(
    +prevMonth.value +
      cashEarnings -
      (+curier.value + +returnsInput.value + +fvInput.value)
  ).toFixed(2);
  const difference = parseFloat(total - +currentMonth.value).toFixed(2);

  return [+total === +currentMonth.value, difference];
}

const form = document.querySelector("form");
const result = document.querySelector(".show-result");
const okResult = document.querySelector(".result-ok");
const errorResult = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.toggle("hide");
  result.classList.toggle("hide");
  let [correct, difference] = isCorrect();
  correct
    ? okResult.classList.remove("hide")
    : errorResult.classList.remove("hide");

  document.querySelector(".cash-incorrect").textContent = `${Math.abs(
    difference
  )} zł`;
});

// RETURN TO FORM

document.querySelector(".back").addEventListener("click", () => {
  form.classList.toggle("hide");
  result.classList.toggle("hide");
  okResult.classList.add("hide");
  errorResult.classList.add("hide");
});

// RESET BUTTON

document.querySelector(".reset").addEventListener("click", () => {
  displayCash.textContent = "0.00 zł";
  returnHidden.style.visibility = "hidden";
  returnsInput.removeAttribute("required");
  fvHidden.style.visibility = "hidden";
  fvInput.removeAttribute("required");
});
