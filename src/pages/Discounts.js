import { useState, useEffect } from 'react'
import DiscountsCollection from "../components/Discounts/DiscountsCollection"
import Popup from '../components/Popup'
import { fetchDiscounts } from '../utils/getProtoCollection'

function Discounts() {

    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)

    console.log(popupCard)

    return (
        <div className="container">
            <DiscountsCollection showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />
            {showPopup ?
                <Popup showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} />
                : null}

        </div>
    )
}

export default Discounts