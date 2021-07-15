import { useState, useEffect } from 'react'
import Collection from "../components/Collection"
import Popup from '../components/Popup'
import { fetchDiscounts } from '../utils/getProtoCollection'

function Discounts() {

    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)

    console.log(popupCard)

    return (
        <div className="container">
            <Collection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} loadCollection={fetchDiscounts} />
            {showPopup ?
                <Popup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
                : null}

        </div>
    )
}

export default Discounts