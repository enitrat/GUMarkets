import { setupAndLogin, getUserAssets, getAllUserAssets, testUser } from '../utils/ImmutableXConnection'
import { LoggedContext } from '../utils/context'
import { useEffect, useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import Item from '../components/Item'

function Account() {

    const { logged, setLogged } = useContext(LoggedContext);
    const [address, setAddress] = useState('')
    const [cards, setCards] = useState([])
    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)


    async function logAccount() {
        if (!logged) {
            try {
                await setupAndLogin()
                setLogged(true)
            }
            catch (err) {
                console.log(err)
                setLogged(false)
            }
        }
        setAddress(localStorage.getItem('WALLET_ADDRESS'))
        fetchAssets();

    }

    useEffect(() => {
        logAccount();
    }, [])


    async function fetchAssets() {
        try {
            const res = await getAllUserAssets();
            setCards(res)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <h1>My user Page</h1>
            <span>My address : {address} </span>
            <span>My collection : </span>
            {logged ?
                <ul className="list-unstyled">
                    <div className="row">
                        {cards.map((card) => (
                            <Item key={card.id} card={card} showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />)
                        )}
                    </div>
                </ul>
                :
                null

            }

        </div>
    )
}

export default Account