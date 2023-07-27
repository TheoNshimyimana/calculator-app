const display = document.querySelector('.screen');
const btnDelete = document.querySelector('.btn--delete');
const btnClear = document.querySelector('.btn--clear');
const btnNumbers = document.querySelectorAll('.btn--numbers');
const btnOperators = document.querySelectorAll('.btn--operators');
const btnEqual = document.querySelector('.btn--equal');
const btnDecimal = document.querySelector('.btn--decimal');

// Variables
let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldClearDisplay = false;
let isError = false;

// Screen display
function updateDisplay(value) {
  display.textContent = value;
}

//clear Operation
function clearCalculator() {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  shouldClearDisplay = false;
  isError = false;
  updateDisplay('0');
}

function handleDelete() {
  if (shouldClearDisplay || display.textContent === '0') return;

  firstNumber = firstNumber.slice(0, -1);
  if (firstNumber === '') firstNumber = '0';

  updateDisplay(firstNumber);
}

// Decimal operation
function handleDecimal() {
  if (isError) return;

  if (shouldClearDisplay) {
    firstNumber = '0';
    shouldClearDisplay = false;
  }

  if (!display.textContent.includes('.')) {
    firstNumber += '.';
    updateDisplay(firstNumber);
  }
}

// Equal
function handleEqual() {
  if (isError) return;

  if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
    const result = operate();
    updateDisplay(result.toString());
    firstNumber = result.toString();
    operator = '';
    shouldClearDisplay = true;
    secondNumber = '';
  }
}

function handleNumberClick(number) {
  if (shouldClearDisplay) {
    firstNumber = '';
    shouldClearDisplay = false;
  }

  if (number === '.' && firstNumber.includes('.')) return;

  firstNumber += number;
  updateDisplay(firstNumber);
}

function handleOperatorClick(selectedOperator) {
  if (isError) return;

  if (firstNumber !== '' && operator !== '') {
    operator = selectedOperator;
  } else {
    operator = selectedOperator;
    secondNumber = display.textContent;
  }

  shouldClearDisplay = true;
}

// Handlers
btnNumbers.forEach((numberBtn) => {
  numberBtn.addEventListener('click', () => {
    handleNumberClick(numberBtn.textContent);
  });
});

btnOperators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', () => {
    handleOperatorClick(operatorBtn.textContent);
  });
});

// Operations
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return b - a;
}

function divide(a, b) {
  return b / a;
}

// Switch cases
function operate() {
  if (operator === '+') {
    return add(parseFloat(firstNumber), parseFloat(secondNumber));
  } else if (operator === '-') {
    return subtract(parseFloat(firstNumber), parseFloat(secondNumber));
  } else if (operator === '×') {
    return multiply(parseFloat(firstNumber), parseFloat(secondNumber));
  } else if (operator === '÷') {
    return divide(parseFloat(firstNumber), parseFloat(secondNumber));
  }
  return 'Error';
}
////Events
btnClear.addEventListener('click', clearCalculator);
btnDelete.addEventListener('click', handleDelete);
btnDecimal.addEventListener('click', handleDecimal);
btnEqual.addEventListener('click', handleEqual);
