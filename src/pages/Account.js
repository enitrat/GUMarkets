import { setupAndLogin } from '../utils/ImmutableXConnection'
import { LoggedContext } from '../utils/context'
import { useEffect, useState, useContext } from 'react'
import { Redirect } from 'react-router'

import OwnedCollection from '../components/OwnedCollection'
import OwnedPopup from '../components/OwnedPopup'
import { Spinner } from 'react-bootstrap'


function Account() {

    const { logged, setLogged } = useContext(LoggedContext);
    const [address, setAddress] = useState('')
    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)
    const [isLoading, setLoading] = useState(true);




    async function logAccount() {
        setLoading(true)
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
        setLoading(false)
    }

    useEffect(() => {
        logAccount();
    }, [])


    // return (
    //     <div className="container">
    //         <OwnedCollection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} user={address} />
    //         {showPopup ?
    //             <OwnedPopup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
    //             : null}
    //     </div>
    // )
    return (
        <>
            {isLoading ? <div className="container d-flex justify-content-center">
                < Spinner animation="grow" /> </div > :
                <>
                    <Redirect to={'/godsunchained/user/' + localStorage.getItem('WALLET_ADDRESS')} />
                </>
            }
        </>
    )

}

export default Account