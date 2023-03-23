import rickAndMortyLogo from '../../assets/rick_and_morty-logo.svg'
import './Header.scss'

const Header: React.FC = () => {
  return (
    <header>
      <div className="fm-header">
        <img className='fm-header__logo' src={rickAndMortyLogo}/>
        <span className='fm-header__span'>Juego de memoria</span>
      </div>
    </header>
  )
}

export default Header
