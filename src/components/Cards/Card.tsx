import { type Character } from '../types/Character'
import './Card.scss'

interface Props {
  character: Character
  onClick: (id: number) => void
  isFlipped: boolean
  isDisabled: boolean
}

const Card = ({ character, onClick, isFlipped, isDisabled }: Props) => {
  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(character.id)
    }
  }

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${
        isDisabled ? 'disabled' : ''
      }`}
      onClick={handleClick}
    >
      <div className="card-front">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="card-back">{character.name}</div>
    </div>
  )
}

export default Card
