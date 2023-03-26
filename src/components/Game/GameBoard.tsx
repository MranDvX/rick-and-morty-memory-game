import React, { useEffect, useState } from 'react'
import GET_CHARACTERS from '../../clients/http'
import { useQuery } from '@apollo/client'
import CardList from '../Cards/CardList'
import GameOver from './GameOver'
import './GameBoard.scss'

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

  const handleCardClick = (id: string) => {
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
  const resetGame = () => {
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

const createCharacterList = (charactersData: any[]) => {
  const fetchedCharacters = charactersData.map((char: any) => ({
    ...char,
    flipped: false
  }))
  const duplicatedCharacters = fetchedCharacters.map((char: any) => ({
    ...char,
    id: `duplicate-${char.id}`
  }))
  return [...fetchedCharacters, ...duplicatedCharacters]
}

const initiateGame = (characters: any[], setCharacters: any) => {
  const shuffledCharacters = shuffleArray(characters)
  const flippedCharacters = shuffledCharacters.map((char) => ({
    ...char,
    flipped: true
  }))
  setCharacters(flippedCharacters)
  setTimeout(() => {
    const unflippedCharacters = flippedCharacters.map((char) => ({
      ...char,
      flipped: false
    }))
    setCharacters(unflippedCharacters)
  }, 10000)
}

const shuffleArray = (array: any[]) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const handleClickOnCard = async (
  characters: any[],
  setCharacters: any,
  id: string,
  selectedCards: any[],
  setSelectedCards: any,
  turns: number,
  setTurns: any,
  matches: number,
  setMatches: any
) => {
  const clickedCard = characters.find((char) => char.id === id)
  if (!clickedCard.flipped && selectedCards.length < 2) {
    const updatedCard = { ...clickedCard, flipped: true }
    const updatedCharacters = characters.map((char) =>
      char.id === id ? updatedCard : char
    )
    setCharacters(updatedCharacters)
    setSelectedCards([...selectedCards, updatedCard])

    if (selectedCards.length === 1) {
      setTurns(turns + 1)
      await new Promise((resolve) => setTimeout(resolve, 0))
      setTimeout(
        () => {
          checkMatch(
            updatedCharacters,
            setCharacters,
            setSelectedCards,
            [...selectedCards, updatedCard],
            matches,
            setMatches
          )
        },
        1000
      )
    }
  }
}

const checkMatch = (
  characters: any[],
  setCharacters: any,
  setSelectedCards: any,
  selectedCards: any[],
  matches: number,
  setMatches: any
) => {
  if (selectedCards[0].name === selectedCards[1].name) {
    const updatedCharacters = characters.map((char) => {
      if (selectedCards.some((selected) => selected.id === char.id)) {
        return { ...char, matched: true }
      }
      return char
    })
    setTimeout(() => {
      setCharacters(updatedCharacters)
      setSelectedCards([])
      setMatches(matches + 1)
    }, 1000)
  } else {
    const updatedCharacters = characters.map((char) => {
      if (selectedCards.some((selected) => selected.id === char.id)) {
        return { ...char, flipped: false }
      }
      return char
    })
    setTimeout(() => {
      setCharacters(updatedCharacters)
      setSelectedCards([])
    }, 1000)
  }
}

const removeMatchedCards = (
  characters: any[],
  setSelectedCards: any,
  selectedCards: any[]
) => {
  const updatedCharacters = characters.filter(
    (char) => !selectedCards.some((selected) => selected.id === char.id)
  )
  setSelectedCards([])
}

const flipBackCards = (
  characters: any[],
  setSelectedCards: any,
  selectedCards: any[]
) => {
  const updatedCharacters = characters.map((char) => {
    if (selectedCards.some((selected) => selected.id === char.id)) {
      return { ...char, flipped: false }
    }
    return char
  })
  setSelectedCards([])
}

export default GameBoard
