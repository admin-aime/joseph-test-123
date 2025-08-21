import React, { useState, useRef } from 'react';
  import styled, { keyframes } from 'styled-components';

  const monkeyDance = keyframes`
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  `;

  const CalculatorContainer = styled.div`
    background-color: ${props => props.theme.background};
    border-radius: 20px;
    box-shadow: 0 10px 20px ${props => props.theme.shadowColor};
    padding: 20px;
    width: 350px;
    text-align: center;
    position: relative;
    border: 5px solid ${props => props.theme.bananaColor};
  `;

  const Display = styled.div`
    background-color: #FFF8DC;
    color: ${props => props.theme.textColor};
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    font-size: 24px;
    text-align: right;
    border: 3px solid ${props => props.theme.bananaColor};
  `;

  const Button = styled.button`
    background-color: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.textColor};
    border: 2px solid ${props => props.theme.bananaColor};
    border-radius: 15px;
    padding: 15px;
    margin: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.05);
      background-color: #FFD700;
    }
  `;

  const MonkeyContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 50px;
    animation: ${monkeyDance} 0.5s infinite;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  `;

  const VolumeControl = styled.input`
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
  `;

  const BananaContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 40px;
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
    const [monkeyMood, setMonkeyMood] = useState('🐒');
    const [volume, setVolume] = useState(0.5);

    const monkeyCheerSound = useRef(new Audio('/sounds/monkey-cheer.mp3'));
    const bananaSound = useRef(new Audio('/sounds/banana-sound.mp3'));

    // Adjust volume for both sounds
    React.useEffect(() => {
      if (monkeyCheerSound.current) monkeyCheerSound.current.volume = volume;
      if (bananaSound.current) bananaSound.current.volume = volume;
    }, [volume]);

    const handleMonkeyClick = () => {
      const moods = ['🐒', '🙊', '🐵', '🤪'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMonkeyMood(randomMood);
      
      if (monkeyCheerSound.current) monkeyCheerSound.current.play();
    };

    const handleNumber = (num) => {
      // Banana Easter egg
      if (display === '0' && num === '8') {
        if (bananaSound.current) bananaSound.current.play();
        setDisplay('🍌');
        return;
      }

      setDisplay(display === '0' ? num : display + num);
    };

    const calculate = () => {
      try {
        const result = eval(display);
        
        // Monkey-themed calculation results
        if (result === 42) {
          if (monkeyCheerSound.current) monkeyCheerSound.current.play();
          setDisplay('🐒 Monkey Wisdom! 🍌');
        } else if (result % 7 === 0) {
          if (bananaSound.current) bananaSound.current.play();
          setMonkeyMood('🤩');
          setDisplay(result.toString() + ' 🍌');
        } else {
          setDisplay(result.toString());
        }
      } catch {
        setDisplay('Error 🍌');
      }
    };

    const clear = () => {
      setDisplay('0');
      setMonkeyMood('🐒');
    };

    const handleVolumeChange = (e) => {
      setVolume(parseFloat(e.target.value));
    };

    return (
      <CalculatorContainer>
        <MonkeyContainer onClick={handleMonkeyClick}>
          {monkeyMood}
        </MonkeyContainer>
        
        <BananaContainer>🍌</BananaContainer>
        
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

        <VolumeControl 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume} 
          onChange={handleVolumeChange}
        />
      </CalculatorContainer>
    );
  }

  export default Calculator;
