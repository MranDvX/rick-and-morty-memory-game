import React, { useEffect, useState } from 'react'
import GET_CHARACTERS from '../../clients/http'
import { useQuery } from '@apollo/client'
import CardList from '../Cards/CardList'
import GameOver from './GameOver'
import './GameBoard.scss'
import {
  createCharacterList,
  initiateGame,
  handleClickOnCard,
  flipBackCards
} from './utils/gameLogic'

interface GameBoardProps {
  gameStarted: boolean
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const GameBoard: React.FC<GameBoardProps> = ({ gameStarted, setGameStarted }) => {
  const [characters, setCharacters] = useState<any[]>([])
  const [selectedCards, setSelectedCards] = useState<any[]>([])
  const [turns, setTurns] = useState(0)
  const [matches, setMatches] = useState(0)
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { ids: ['1', '2', '3', '4', '5', '6'] }
  })

  useEffect(() => {
    if (!loading && error == null) {
      const fetchedCharacters = createCharacterList(data.charactersByIds)
      setCharacters(fetchedCharacters)
    }
  }, [loading, error, data])

  useEffect(() => {
    if (gameStarted) {
      initiateGame(characters, setCharacters)
    }
  }, [gameStarted, characters])

  const handleCardClick = (id: string): void => {
    if (selectedCards.length < 2) {
      handleClickOnCard(
        characters,
        setCharacters,
        id,
        selectedCards,
        setSelectedCards,
        turns,
        setTurns,
        matches,
        setMatches
      )
    }
  }

  // Agregar estado para controlar si el juego ha terminado
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    // Verificar si el juego ha terminado
    if (matches === 6) {
      setGameOver(true)
    }
  }, [matches])

  // Función para reiniciar el juego
  const resetGame = (): void => {
    setTurns(0)
    setMatches(0)
    const newCharacters = createCharacterList(data.charactersByIds)
    setCharacters(newCharacters)
    initiateGame(newCharacters, setCharacters)
  }

  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>

  return (
    <>
      {gameOver
        ? (
          <GameOver
            turns={turns}
            restartGame={() => {
              setGameStarted(false)
              setGameOver(false)
              resetGame()
            }}
          />
          )
        : (
            <section className='fm-game-board-container'>
              <header>
              <div className="game-info">
                <div className="turns">Turnos: {turns}</div>
                <div className="matches">Aciertos: {matches}</div>
              </div>
              </header>
              <article>
                <CardList characters={characters} handleCardClick={handleCardClick} />
              </article>
            </section>
          )}
    </>
  )
}

export default GameBoard
