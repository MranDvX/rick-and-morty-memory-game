import { useState } from 'react'
import Header from '../Header/Header'
import GameBoard from './GameBoard'
import GameControls from './GameControls'
import './Game.scss'

const Game: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [turns, setTurns] = useState(0)

  return (
    <>
      <Header />
      <div className="fm-game-container">
        <h1>Personajes</h1>
        <GameBoard gameStarted={gameStarted} setGameStarted={setGameStarted} />
        <GameControls
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          isGameOver={isGameOver}
          turns={turns}
        />
      </div>
    </>
  )
}

export default Game
