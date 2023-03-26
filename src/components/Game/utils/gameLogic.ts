export const createCharacterList = (charactersData: any[]) => {
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

export const initiateGame = (characters: any[], setCharacters: any) => {
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

export const shuffleArray = (array: any[]) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const handleClickOnCard = async (
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
    flipBackCards(characters, setCharacters, setSelectedCards, selectedCards)
  }
}

export const flipBackCards = (
  characters: any[],
  setCharacters: any,
  setSelectedCards: any,
  selectedCards: any[]
) => {
  setTimeout(() => {
    const updatedCharacters = characters.map((char) => {
      if (selectedCards.some((selected) => selected.id === char.id)) {
        return { ...char, flipped: false }
      }
      return char
    })
    setSelectedCards([])
    setCharacters(updatedCharacters)
  }, 1000)
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
