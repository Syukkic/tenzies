import './App.css';
import Die from './Die';
import ReactConfetti from 'react-confetti';
import { DieType } from './dice.types';
import { nanoid } from 'nanoid';
import { useRef, useState, useEffect } from 'react';

function App() {
  const [dice, setDice] = useState<DieType[]>(() => generateAllDice());
  const buttomElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      click={() => handleDieState(die.id)}
      aria-label={`Die ${die.id} showing ${die.value}`}
    />
  ));
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (gameWon && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllDice() {
    return Array.from({ length: 10 }).map(() => ({
      id: nanoid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
    }));
  }

  function handleDieState(id: string) {
    setDice((preDice) =>
      preDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  function rollDice() {
    if (!gameWon) {
      setDice((preDice) =>
        preDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      );
    } else {
      setDice(() => generateAllDice());
    }
  }

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulation! You won! Press "New Game" to start again</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{buttomElements}</div>
      <button
        ref={buttonRef}
        className="roll-dice"
        onClick={rollDice}
        aria-label={gameWon ? 'Start a new game' : 'Roll the dice'}
      >
        {gameWon ? 'Start New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
