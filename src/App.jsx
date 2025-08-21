import React, { useState } from 'react';
  import { ThemeProvider, createGlobalStyle } from 'styled-components';
  import { lightTheme, darkTheme } from './theme';
  import Calculator from './Calculator';

  const GlobalStyle = createGlobalStyle`
    body {
      font-family: 'Comic Sans MS', cursive;
      background-color: ${props => props.theme.background};
      transition: all 0.3s ease;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
  `;

  function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };

    return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Calculator 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
      </ThemeProvider>
    );
  }

  export default App;
