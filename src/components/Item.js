import { useState, useEffect } from 'react'
import Axios from 'axios'
import Popup from './Popup'


function Item({ id, card, showPopup, setPopup, popupCard, setPopupCard }) {


    const handleClick = () => {
        setPopup(!showPopup)
        setPopupCard(card)
    }


    return (
        <div className="card">
            <li key={id}>
                <img className='nft-item-cover' src={card.image_url} alt={`${id} cover`} onClick={handleClick} />
            </li>

        </div>
    )
}

export default Item