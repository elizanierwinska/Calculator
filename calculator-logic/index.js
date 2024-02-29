const maxDisplayedNumLength = 12;
const endOfResult = 13;
const maxNumber = 999999999999;
const minNumber = -99999999999;
const ten = 10;

const trimTheResult = (result) => {
  try{
    if(result === Infinity) return Infinity;

    const stringified = result.toString();

    if(stringified.indexOf('.') === maxDisplayedNumLength){
      throw new Error ('Error');
    }
    if(result < maxNumber && result > minNumber){
      if(result.toString().length > maxDisplayedNumLength){
        return Number(result.toString().slice(0, endOfResult));
      } else {
        return result;
      }
    } else{
      throw new Error('Error');
    }
  } catch (error) {
    return error.message;
  }
}

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  if (operator === 'add') {
   return trimTheResult((firstNum * ten + secondNum * ten)/ten);
  }
  if (operator === 'subtract') {
    return trimTheResult((firstNum * ten - secondNum * ten)/ten);
  }
  if (operator === 'multiply') {
    return trimTheResult(((firstNum * ten) * (secondNum * ten))/(ten*ten));
  }
  if (operator === 'divide') {
    return trimTheResult(((firstNum * ten) / (secondNum * ten)));
  }
}

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return 'number';
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator';
  // For everything else, return the action
  return action;
}

function createResultString(key, displayedNum, state){
  console.log(state)
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  console.log(state)
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = state;

  if (keyType === 'number') {
    if(displayedNum === '0' ||
    previousKeyType === 'operator' ||
    previousKeyType === 'calculate'){
        return keyContent;
    } else {
      if(displayedNum.length < endOfResult){
        return displayedNum + keyContent;
      } else {
        return displayedNum;
      }
    }
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum;
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === 'clear') return 0;

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum;
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
      ? modValue
      : displayedNum;
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
  }
}


const calculator = document.getElementById('calculator');
const display = document.getElementById('display');
let keys;
if(calculator !== null ){
  keys = calculator.querySelector('.buttons');
}

document.addEventListener('DOMContentLoaded', () => {
  keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const displayedNum = display.textContent;
    const resultString = createResultString(key, displayedNum, calculator.dataset);

    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, displayedNum);
  })
})
module.exports = {trimTheResult, calculate};