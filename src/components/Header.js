import '../styles/Header.css'
import Logo from '../assets/logo.png'

function Header() {
    return (
        <div className=" jumbotron d-flex headerWrapper">
            <img src={Logo} className="mainLogo" alt="mainLogo" />
            <h1 className="mainTitle">GodsUnchained</h1>

        </div>
    )
}

export default Header