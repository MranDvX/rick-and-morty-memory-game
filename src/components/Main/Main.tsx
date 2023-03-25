import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import './Main.scss'

const Main: React.FC = () => {
  const navigate = useNavigate()

  // useCallback is used to avoid unnecessary re-renders
  const handleClick = React.useCallback(() => {
    navigate('/game')
  }, [navigate])

  return (
    <>
      <Header />
      <main>
        <section className="fm-section">
          <header className="fm-section__title">
            <h1>Personajes</h1>
          </header>
          <article>
            {/* <div className="fm-section__cards">
            </div> */}
          </article>
          <footer>
            <button className='fm-section__primary-button' onClick={handleClick}>Jugar</button>
          </footer>
          </section>
      </main>
    </>
  )
}

export default Main
