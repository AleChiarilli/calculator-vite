import "./style.css";

const numbers = document.querySelectorAll(".number");
const result = document.getElementById("final-value") as HTMLElement;
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals") as HTMLElement;
const clear = document.querySelector(".clear") as HTMLElement;
const negative = document.querySelector(".negative") as HTMLElement;
const percent = document.querySelector(".percent") as HTMLElement;

const status = document.getElementById("calculator-status") as HTMLElement;

let firstValue: string = "";
let secondValue: string = "";

let operator = "";

function updateCalculatorStatus() {
  return `${firstValue} ${operator} ${secondValue}`;
};

numbers.forEach((n) => n.addEventListener('click', (event) => {
  const numberButton = event.currentTarget as HTMLElement;
  const value = numberButton.innerText;
  let displayedValue = "";
  const isComma = value === ",";
  if (!operator) {
    if (isComma && firstValue.includes(",")) return;
      firstValue += value;
      displayedValue = firstValue;
  } else {
    if (isComma && secondValue.includes(",")) return;
      secondValue += value;
      displayedValue = secondValue;
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
  const valueA = numberA.includes(',') ? parseFloat(numberA.replace(',' , '.')) : parseInt(numberA);
  const valueB = numberB.includes(',') ? parseFloat(numberB.replace(',' , '.')) : parseInt(numberB);
  
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
};

equals.addEventListener('click', () => {
  if (!operator) return;
  const calculationResult = `${calculate(firstValue, secondValue, operator)
  }`;
  result.innerHTML = calculationResult.includes('.') ? calculationResult.replace('.' , ',') : calculationResult;
  firstValue = calculationResult;
  operator = "";
  secondValue= "";
  status.innerHTML = updateCalculatorStatus();
  status.innerHTML = "";
});

clear.addEventListener('click', () => {
  result.innerHTML = "0";
  status.innerHTML = "";
  operator = "";
  firstValue = "";
  secondValue = "";
});

negative.addEventListener('click', () => {
  const convert = parseInt(firstValue) * -1;
  firstValue = convert.toString();
  result.innerHTML = convert.toString();
});

percent.addEventListener('click', () => {
  const percent = parseFloat(firstValue) / 100
  firstValue = percent.toString();
  result.innerHTML = firstValue;
});