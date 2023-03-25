import React from 'react'
import './GameOver.scss'
import { useNavigate } from 'react-router-dom'

interface GameOverProps {
  turns: number
  restartGame: () => void
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const GameOver: React.FC<GameOverProps> = ({
  turns,
  restartGame,
  setGameStarted
}) => {
  const navigate = useNavigate()

  return (
    <div className="game-over">
      <h2>¡Felicidades!</h2>
      <p>
        Has completado el juego en <strong>{turns}</strong> turnos.
      </p>
      <button
        className="restart-game-button"
        onClick={() => {
          restartGame()
          setGameStarted(true)
        }}
      >
        Reiniciar
      </button>
      <button
        className="go-home-button"
        onClick={() => { navigate('/') }}
      >
        Inicio
      </button>
    </div>
  )
}

export default GameOver
