import { setupAndLogin } from '../utils/ImmutableXConnection'
import { LoggedContext } from '../utils/context'
import { useEffect, useState, useContext } from 'react'

import OwnedCollection from '../components/OwnedCollection'
import OwnedPopup from '../components/OwnedPopup'

function Account() {

    const { logged, setLogged } = useContext(LoggedContext);
    const [address, setAddress] = useState('')
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
    }

    useEffect(() => {
        logAccount();
    }, [])


    return (
        <div className="container">
            <OwnedCollection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} user={address} />
            {showPopup ?
                <OwnedPopup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
                : null}
        </div>
    )
}

export default Account