import '../styles/Header.css'
import Logo from '../assets/logo.png'
import Web3 from 'web3';

function Header() {

    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account)
        console.log(window.ethereum.coinbase)
    }

    const handleClick = () => {
        getAccount();
    }
    return (
        <div className=" jumbotron d-flex headerWrapper">
            <img src={Logo} className="mainLogo" alt="mainLogo" />
            <h1 className="mainTitle">GodsUnchained</h1>
            <button onClick={handleClick}>Connect to Ethereum</button>
        </div>
    )
}

export default Header