const calculator = document.getElementById('calculator');
const display = document.getElementById('display')
const keys = calculator.querySelector('.buttons');


const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2)
  if(operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return  firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;

}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const { action } = key.dataset
  const {
    firstValue,
    modValue,
    operator,
    previousKeyType
  } = state
}

const getKeyType = (key) => {
  const {action} = key.dataset;
  if(!action) return 'number';
  if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') return operator;

  return action;
}

keys.addEventListener('click', e => {
  if(e.target.matches('button')){
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    const createResultString = (key, displayedNum, state) => {
      const keyType = getKeyType(key)
``
      if (keyType === 'number') {
        return displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
          ? keyContent
          : displayedNum + keyContent
      }

      if(action === 'decimal') {
        if(!displayedNum.includes('.')) return displayedNum +  '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';

        return displayedNum;
      }

      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        
        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculate(firstValue, operator, displayedNum)
          : displayedNum
      }

      if(action === 'clear') return 0

      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
        
        if (firstValue) {
          return previousKeyType === 'calculate' ?
          calculate(displayedNum , operator, secondValue) : calculate(firstValue, operator, secondValue);
        } else {
          return displayedNum
        }
      }
      }
    }

  }
  // if(e.target.matches('button')){
  //   if(!action){
  //     if (display.value === '0'){
  //       display.value = button.innerHTML;
  //     } else {
  //       display.value += button.innerHTML
  //     }
  //   } else if(action === 'clear'){
  //     display.value = '0';
  //   } else if(action === 'delete'){
  //     display.value = display.value.toString().slice(0, -1);
  //   } else if(action === 'decimal') {
  //     display.value += button.innerHTML;
  //     button.disabled = true;
  //   }
  // }
})