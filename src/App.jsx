import React, { useState } from 'react'

  function App() {
    const [display, setDisplay] = useState('0')
    const [firstOperand, setFirstOperand] = useState(null)
    const [operator, setOperator] = useState(null)
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

    const inputDigit = (digit) => {
      if (waitingForSecondOperand) {
        setDisplay(String(digit))
        setWaitingForSecondOperand(false)
      } else {
        setDisplay(display === '0' ? String(digit) : display + digit)
      }
    }

    const inputDecimal = () => {
      if (!display.includes('.')) {
        setDisplay(display + '.')
      }
    }

    const clearDisplay = () => {
      setDisplay('0')
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecondOperand(false)
    }

    const performOperation = (nextOperator) => {
      const inputValue = parseFloat(display)

      if (firstOperand === null) {
        setFirstOperand(inputValue)
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)
        setDisplay(String(result))
        setFirstOperand(result)
      }

      setWaitingForSecondOperand(true)
      setOperator(nextOperator)
    }

    const calculate = (firstOperand, secondOperand, operator) => {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand
        case '-':
          return firstOperand - secondOperand
        case '*':
          return firstOperand * secondOperand
        case '/':
          return firstOperand / secondOperand
        default:
          return secondOperand
      }
    }

    return (
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={() => clearDisplay()}>AC</button>
          <button onClick={() => performOperation('/')} className="operator">/</button>
          <button onClick={() => performOperation('*')} className="operator">*</button>
          
          <button onClick={() => inputDigit(7)}>7</button>
          <button onClick={() => inputDigit(8)}>8</button>
          <button onClick={() => inputDigit(9)}>9</button>
          <button onClick={() => performOperation('-')} className="operator">-</button>
          
          <button onClick={() => inputDigit(4)}>4</button>
          <button onClick={() => inputDigit(5)}>5</button>
          <button onClick={() => inputDigit(6)}>6</button>
          <button onClick={() => performOperation('+')} className="operator">+</button>
          
          <button onClick={() => inputDigit(1)}>1</button>
          <button onClick={() => inputDigit(2)}>2</button>
          <button onClick={() => inputDigit(3)}>3</button>
          <button onClick={() => inputDigit(0)}>0</button>
          
          <button onClick={() => inputDecimal()}>.</button>
          <button onClick={() => performOperation('=')} className="equals">=</button>
        </div>
      </div>
    )
  }

  export default App
