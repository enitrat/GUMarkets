import '../styles/Header.css'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { setupAndLogin, logout } from '../utils/ImmutableXConnection'
import { useContext } from 'react'
import { LoggedContext } from '../utils/context'
import { useHistory } from "react-router-dom";
import { DefaultButton, SearchBar } from '../styles/GlobalStyle'
import { useState } from 'react'

function Header() {


    const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
    const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #c4fffc;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
`

    const HeaderWrapper = styled.nav`
    background-image: linear-gradient(to right, rgb(50, 50, 50) 10%, transparent), linear-gradient(to top, rgb(2, 2, 2) 1%, transparent), url(https://blog.godsunchained.com/wp-content/uploads/2019/12/atlas_header.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display:flex;
    align-items: center;
    max-height: 75px;
    justify-content: space-between;
    position:fixed;
    z-index:100;
    top: 0;
    width: 100%;
    
    
    
`

    const { logged, setLogged } = useContext(LoggedContext);
    const [search, setSearch] = useState('')
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

    const handleInput = (e) => {
        setSearch(e.target.value)
    }


    return (
        <HeaderWrapper>
            <div>
                <img src={Logo} className="mainLogo" alt="mainLogo" />
            </div>
            <div>

                <div className=" d-flex justify-content-center">
                    <SearchBar type="text" placeholder="Enter eth address" onChange={handleInput} />
                    <StyledLink className="link" to={`/godsunchained/user/${search}`} >Search user</StyledLink>
                </div>

            </div>
            <NavContainer>
                {logged ? <DefaultButton onClick={handleDisconnect}>Disconnect</DefaultButton> : (<DefaultButton onClick={handleConnect}>Connect</DefaultButton>)}
                <StyledLink className="link" to="/godsunchained/browse" >Browse Cards</StyledLink>
                <StyledLink className="link" to="/godsunchained/account">Your Account</StyledLink>
                <StyledLink className="link" to="/godsunchained/discounts">Discounts</StyledLink>
            </NavContainer>
        </HeaderWrapper>
    )
}

export default Header