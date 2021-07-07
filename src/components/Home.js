import { useState, useEffect } from 'react'
import Collection from "./Collection"
import Popup from './Popup'

function Home() {

    const [showPopup, setPopup] = useState(false);
    const [popupName, setPopupName] = useState('')

    console.log(popupName)

    return (
        <div className="container">
            {showPopup ?
                <Popup showPopup={showPopup} setPopup={setPopup} name={popupName} />
                : null}
            <Collection showPopup={showPopup} setPopup={setPopup} popupName={popupName} setPopupName={setPopupName} />
        </div>
    )
}

export default Home