class Calculator {
  constructor(prevOperandElement, currOperandElement){
    this.prevOperandElement = prevOperandElement
    this.currOperandElement = currOperandElement
    this.allClear()
}
  allClear() {
    this.prevOperand = ''
    this.currOperand = ''
    this.operation = undefined
    this.updateDisplay()
  }
  appendNumber(num) {
    this.currOperand = this.currOperand.toString() + num.toString()
  }
  updateDisplay(){
    this.currOperandElement.innerText = this.currOperand
  }
}


const numButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')

const prevOperTextEl = document.querySelector('[data-previous-operand]')
const currOperTextEl = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperTextEl, currOperTextEl);


numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});
clearButton.addEventListener('click', () => {
  calculator.allClear();
})