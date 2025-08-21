import React, { useState } from 'react';
  import styled from 'styled-components';

  const CalculatorContainer = styled.div`
    background-color: ${props => props.theme.background};
    border-radius: 20px;
    box-shadow: 0 10px 20px ${props => props.theme.shadowColor};
    padding: 20px;
    width: 300px;
    text-align: center;
  `;

  const Display = styled.div`
    background-color: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.textColor};
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    font-size: 24px;
    text-align: right;
  `;

  const Button = styled.button`
    background-color: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.textColor};
    border: none;
    border-radius: 10px;
    padding: 15px;
    margin: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.05);
    }
  `;

  const ThemeToggle = styled.button`
    background-color: ${props => props.theme.bananaColor};
    color: black;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  `;

  function Calculator({ isDarkMode, toggleTheme }) {
    const [display, setDisplay] = useState('0');

    const handleNumber = (num) => {
      setDisplay(display === '0' ? num : display + num);
    };

    const calculate = () => {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error 🍌');
      }
    };

    const clear = () => setDisplay('0');

    return (
      <CalculatorContainer>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </ThemeToggle>
        <Display>{display}</Display>
        <div>
          {[7, 8, 9].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleNumber('/')}>÷</Button>
        </div>
        <div>
          {[4, 5, 6].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleNumber('*')}>×</Button>
        </div>
        <div>
          {[1, 2, 3].map(num => (
            <Button key={num} onClick={() => handleNumber(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleNumber('-')}>-</Button>
        </div>
        <div>
          <Button onClick={() => handleNumber('0')}>0</Button>
          <Button onClick={clear}>C</Button>
          <Button onClick={calculate}>=</Button>
          <Button onClick={() => handleNumber('+')}>+</Button>
        </div>
      </CalculatorContainer>
    );
  }

  export default Calculator;
