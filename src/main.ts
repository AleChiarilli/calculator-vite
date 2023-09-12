import "./style.css";

const numbers = document.querySelectorAll(".number");
const result = document.getElementById("final-value") as HTMLElement;
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals") as HTMLElement;
const clear = document.querySelector(".clear") as HTMLElement;
const negative = document.querySelector(".negative");
const percent = document.querySelector(".percent");

const status = document.getElementById("calculator-status") as HTMLElement;

let firstValue: string = "";
let secondValue: string = "";

let operator = "";
let resultValue = "";

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i].addEventListener("click", (e: any) => {
//     let atr = e.target?.getAttribute("value");
//     if (isFirstValue === false) {
//       getFirstValue(atr);
//     }
//     if (isSecondValue === false) {
//       getSecondValue(atr);
//     }
//   });
// }

function updateCalculatorStatus() {
  return `${firstValue} ${operator} ${secondValue}`;
}

numbers.forEach((n) => n.addEventListener('click', (event) => {
  const numberButton = event.currentTarget as HTMLElement;
  const value = numberButton.innerText;
  let displayedValue = "";
  if (!operator) {
    firstValue += value;
    displayedValue = firstValue;
  } else {
    secondValue += value;
    displayedValue = secondValue;
  }
  if (resultValue) {
    firstValue = resultValue;
    secondValue = value;
  }
  result.innerHTML = displayedValue;
  status.innerHTML = updateCalculatorStatus();
}));

signs.forEach((s) => s.addEventListener('click', (event) => {
  const operatorButton = event.currentTarget as HTMLElement;
  const value = operatorButton.innerText;
  operator = value;
  status.innerHTML = updateCalculatorStatus();
}));

function calculate(numberA: string, numberB: string, operatorSymbol: string) {
  const valueA = Number(numberA);
  const valueB = Number(numberB);
  switch (operatorSymbol) {
    case '+' :
      return valueA + valueB;
  
    case '-' :
      return valueA - valueB;

    case 'X' :
      return valueA * valueB;

    case '÷' :
      return valueA / valueB;

    default: 
      return valueA;
  }
}


equals.addEventListener('click', () => {
  if (!operator) return;
  result.innerHTML = `${calculate(firstValue, secondValue, operator)
  }`;
  status.innerHTML = updateCalculatorStatus();
})

clear.addEventListener('click', () => {
  result.innerHTML = "0";
  status.innerHTML = "";
  operator = "";
  firstValue = "";
  secondValue = "";
})



// function getFirstValue(el: number) {
//   result.innerHTML = "";
//   firstValue += el;
//   result.innerHTML = `${firstValue}`;
//   firstValue = +firstValue;
// }

// function getSecondValue(el: number) {
//   if (firstValue != 0 && sign != "") {
//     secondValue += el;
//     result.innerHTML = `${secondValue}`;
//     secondValue = +secondValue;
//   }
// }

// function getSign() {
//   for (let i = 0; i < signs.length; i++) {
//     signs[i].addEventListener("click", (e: any) => {
//       sign = e.target?.getAttribute("value");
//       isFirstValue = true;
//     });
//   }
// }
// getSign();
