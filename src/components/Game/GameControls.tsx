import React from 'react'
import './gameControls.scss'

interface GameControlsProps {
  gameStarted: boolean
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
  isGameOver: boolean // Añade esta propiedad
  turns: number // Añade esta propiedad
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStarted,
  setGameStarted,
  isGameOver,
  turns // Agregar turns aquí
}) => {
  const handleRestartClick = () => {
    setGameStarted(false)
    setTimeout(() => { setGameStarted(true) }, 0)
  }

  return (
    <div className="game-controls">
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
