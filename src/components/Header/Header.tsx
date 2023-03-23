import rickAndMortyLogo from '../../assets/rick_and_morty-logo.svg'
import './Header.scss'

const Header: React.FC = () => {
  return (
    <header>
      <div className="fm-header-container">
        <img className='fm-header-logo' src={rickAndMortyLogo}/>
        <span className='fm-header-span'>Juego de memoria</span>
      </div>
    </header>
  )
}

export default Header
