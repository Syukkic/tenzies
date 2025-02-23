import { useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import { DieType } from './dice.types';

function App() {
  const [dice, setDice] = useState<DieType[]>(generateAllDice());

  const buttomElements = dice.map((die) => <Die value={die.value} />);

  function generateAllDice() {
    return Array.from({ length: 10 }).map(() => ({
      id: nanoid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
    }));
  }

  function rollDice() {
    setDice(generateAllDice());
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{buttomElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
