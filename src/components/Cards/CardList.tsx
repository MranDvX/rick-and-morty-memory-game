import React from 'react'
import CharacterCard from '../Cards/CharacterCard'
import './CardList.scss'

interface CardListProps {
  characters: any[]
  handleCardClick: (id: string) => void
}

const CardList: React.FC<CardListProps> = ({ characters, handleCardClick }) => {
  return (
    <div className="game-board">
      {characters.map((character: any) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          flipped={character.flipped}
          status={character.status}
          onClick={() => { handleCardClick(character.id) }}
        />
      ))}
    </div>
  )
}

export default CardList
