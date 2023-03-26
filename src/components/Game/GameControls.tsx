import React from 'react'
import './GameControls.scss'

interface GameControlsProps {
  gameStarted: boolean
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
  isGameOver: boolean
  turns: number
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStarted,
  setGameStarted,
  isGameOver,
  turns
}) => {
  const handleRestartClick = () => {
    setGameStarted(false)
    setTimeout(() => { setGameStarted(true) }, 0)
  }

  return (
    <div className="fm-game-controls">
      {isGameOver && (
        <>
          <p>Juego terminado! Has completado el juego en {turns} turnos.</p>
          <button onClick={handleRestartClick}>Reiniciar juego</button>
        </>
      )}
    </div>
  )
}

export default GameControls
