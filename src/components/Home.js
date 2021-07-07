import { useState, useEffect } from 'react'
import Collection from "./Collection"
import Popup from './Popup'

function Home() {

    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)

    console.log(popupCard)

    return (
        <div className="container">
            {showPopup ?
                <Popup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
                : null}
            <Collection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />
        </div>
    )
}

export default Home