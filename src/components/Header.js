import '../styles/Header.css'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { setupAndLogin, logout } from '../utils/ImmutableXConnection'
import { useContext } from 'react'
import { LoggedContext } from '../utils/context'
import { useHistory } from "react-router-dom";
import { DefaultButton } from '../styles/GlobalStyle'

function Header() {

    const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
    const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
`



    const { logged, setLogged } = useContext(LoggedContext);
    const history = useHistory();

    async function handleConnect() {
        if (logged) {
            alert("user already connected")
        }
        else {
            async function logAccount() {
                try {
                    await setupAndLogin()
                    setLogged(true)
                }
                catch (err) {
                    console.log(err)
                    setLogged(false)
                }
            }
            logAccount();
        }
    }

    const handleDisconnect = () => {
        if (logged) {
            logout();
            setLogged(false)
            let path = `/browse`;
            history.push(path);
            alert("user disconnecterd")
        }
        else {
            alert("user not logged in")
        }
    }


    return (
        <div className=" jumbotron d-flex headerWrapper">
            <div className="d-flex">
                <img src={Logo} className="mainLogo" alt="mainLogo" />
            </div>
            <div className="d-flex">

            </div>
            <NavContainer>
                {logged ? <DefaultButton onClick={handleDisconnect}>Disconnect</DefaultButton> : (<DefaultButton onClick={handleConnect}>Connect</DefaultButton>)}
                <StyledLink className="link" to="/browse" >Browse Cards</StyledLink>
                <StyledLink className="link" to="/account">Your Cards</StyledLink>
                <StyledLink className="link" to="/discounts">Discounts</StyledLink>
            </NavContainer>
        </div>
    )
}

export default Header