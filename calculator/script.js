class Calculator {
  constructor(prevOperandElement, currOperandElement, operationElement, prefixOperandElement){
    this.prevOperandElement = prevOperandElement
    this.currOperandElement = currOperandElement
    this.operationElement = operationElement
    this.prefixOperandElement = prefixOperandElement
    this.allClear()
    this.updateDisplay()
}
  allClear() {
    this.prevOperand = ''
    this.currOperand = '0'
    this.operation = ''
    this.prefixOperation = ''
  }
  swichSign() {
    if (this.currOperand[0] !== '-') {
      console.log('-')
      this.currOperand = '-' + this.currOperand
    } else {
      this.currOperand = this.currOperand.slice(1)
    }
  }
  delete() {
    if( this.currOperand === '0' && this.currOperand.length === 1) return
    this.currOperand = this.currOperand.slice(0, -1)
  }
  dataOperation(operation) {
    if (this.currOperand === '' && operation === '-') {
      this.currOperand = operation
      return
    }
    if (this.prefixOperation !== '') this.operation = operation
    if (this.currOperand === '') return
    if (this.prevOperand !== '') this.calculate()

    if (operation === 'xⁿ') {
      this.operation = '^'
    } else if (operation === '√' && this.currOperand !== '') {
      if (this.currOperand[0] == '-') {
        alert('Invalid operation')
        this.allClear()
        return
      }
      this.currOperand = Math.sqrt(this.currOperand)
      return
    } else {
      this.operation = operation
    }

    

    this.prevOperand = this.currOperand
    this.currOperand = ''
  }
  calculate() {
    let result
    const currNum = parseFloat(this.currOperand)
    let prevNum = parseFloat(this.prevOperand)
    if (isNaN(currNum) || isNaN(prevNum)) return 

    if (this.prefixOperation !== '') prevNum = Math.sqrt(currNum)

    switch (this.operation) {
      case '+':
        result = ((prevNum * 10) + (currNum * 10)) / 10
        break
      case '-':
        result = ((prevNum * 10) - (currNum * 10)) / 10
        break
      case '*':
        result = (prevNum * 10) * (currNum * 10) / (10 * 10)
        break
      case '^':
        result = Math.pow(prevNum, currNum)
        break
      case '÷':
        result = prevNum / currNum
        break
      default:
        return
    }
    this.currOperand = result
    this.operation = ''
    this.prevOperand = ''
  }
  appendNumber(num) {
    if (this.currOperand.length > 10) return
    if (num === '.' && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + num.toString()
  }

  getStyledNumber(num) {
    if (num === '') return ''
    console.log(num)
    console.log(num * 1, 'num * 1')

    let stringNum = num.toString()

    const integerDigits = parseFloat(stringNum.split('.')[0])
    const decimalDigits = stringNum.split('.')[1]
      
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits : 0})
    }

    if (decimalDigits != null) {
      return integerDisplay.toString() + '.' + decimalDigits.toString()
    } else {
      return integerDisplay
    }
  }
  updateDisplay(){
    this.currOperandElement.innerText = this.getStyledNumber(this.currOperand)
    this.prevOperandElement.innerText = this.getStyledNumber(this.prevOperand)
    this.operationElement.innerText = this.operation
    this.prefixOperandElement.innerText = this.prefixOperation
  }
}

const prefixOperandTextEl = document.querySelector('[data-prefix-operand]')
const numButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')
const prevOperTextEl = document.querySelector('[data-previous-operand]')
const currOperTextEl = document.querySelector('[data-current-operand]')
const operationTextEl = document.querySelector('[data-operation]')
const signButton = document.querySelector('[data-sign]')

const calculator = new Calculator(prevOperTextEl, currOperTextEl, operationTextEl, prefixOperandTextEl)

signButton.addEventListener('click', () => {
  calculator.swichSign()
  calculator.updateDisplay()
})
numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})
clearButton.addEventListener('click', () => {
  calculator.allClear()
  calculator.updateDisplay()
})
delButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
operButtons.forEach( button => {
  button.addEventListener( 'click', () => {
    calculator.dataOperation(button.innerText)
    calculator.updateDisplay()
  })
})
equalsButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
  calculator.allClear()
})