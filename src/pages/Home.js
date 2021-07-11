import { useState, useEffect } from 'react'
import Collection from "../components/Collection"
import Popup from '../components/Popup'

function Home() {

    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)

    console.log(popupCard)

    return (
        <div className="container">
            <Collection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />
            {showPopup ?
                <Popup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
                : null}

        </div>
    )
}

export default Home