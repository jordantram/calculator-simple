import React, { useState } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import './App.css';

const App = () => {
  const [inputDisplay, setInputDisplay] = useState('0');
  const [result, setResult] = useState('0');
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClick = (button) => {
    if (button.type === 'clear') {
      setInputDisplay('0');
      setResult('0');
      setJustEvaluated(false);
    } else if (button.type === 'equals') {
      try {
        const answer = eval(result).toString();
        setInputDisplay(answer);
        setResult(answer);
        setJustEvaluated(true);
      } catch(error) {
        setInputDisplay('Syntax error');
        setResult('Syntax error');
      }
    } else {
      if (result === 'Syntax error' || result === '0' || justEvaluated) {
        if (button.type === 'operator') {
          if (justEvaluated || result === '0') {
            setInputDisplay(inputDisplay + button.displaySymbol);
            setResult(result + button.formula);
            setJustEvaluated(false);
          }
        } else {
          setInputDisplay(button.displaySymbol);
          setResult(button.formula);
          setJustEvaluated(false);
        }
      } else {
        setInputDisplay(inputDisplay + button.displaySymbol);
        setResult(result + button.formula);
        setJustEvaluated(false);
      }
    }
  };

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Display input={inputDisplay}/>
        <Keypad handleClick={handleClick}/>
      </div>
    </div>
  );
}

export default App;
