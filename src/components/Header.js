import '../styles/Header.css'
import Logo from '../assets/logo.png'
import Web3 from 'web3';
import { Link } from 'react-router-dom'
import { setupAndLogin, logout } from '../utils/ImmutableXConnection'
import { useState, useContext } from 'react'
import { LoggedContext } from '../utils/context'
import { useHistory } from "react-router-dom";

function Header() {

    const { logged, setLogged } = useContext(LoggedContext);
    const address = localStorage.getItem('WALLET_ADDRESS')
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
            let path = `/`;
            history.push(path);
            alert("user disconnecterd")
        }
        else {
            alert("user not logged in")
        }
    }


    return (
        <div className=" jumbotron d-flex headerWrapper">
            <img src={Logo} className="mainLogo" alt="mainLogo" />
            <h1 className="mainTitle">GodsUnchained</h1>
            <button onClick={handleConnect}>{logged ? <span>{address}</span> : <span>Connect</span>}</button>
            <button onClick={handleDisconnect}>Disconnect</button>
            <nav>
                <Link to="/" >Home page</Link>
                <Link to="/account">Your account</Link>
            </nav>
        </div>
    )
}

export default Header