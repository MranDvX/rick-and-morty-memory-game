import React from 'react'
import './CharacterCard.scss'

interface CharacterCardProps {
  id: string
  name: string
  image: string
  flipped: boolean
  matched?: boolean
  onClick: () => void
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  image,
  flipped,
  matched,
  onClick
}) => {
  return (
    <div
      className={`character-card ${matched ? 'matched' : ''}`}
      onClick={!flipped && !matched ? onClick : undefined}
    >
      {flipped || matched
        ? (
        <img src={image} alt={name} className="character-image" />
          )
        : (
        <div className="character-back" />
          )}
    </div>
  )
}

export default CharacterCard
