import { useState, useEffect } from 'react'
import Axios from 'axios'
import Popup from './Popup'


function Item({ card, showPopup, setPopup, popupCard, setPopupCard }) {


    const handleClick = () => {
        setPopup(!showPopup)
        setPopupCard(card)
    }

    return (
        <div className="card">
            <li key={card.id}>
                <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${card.id}&q=4`} alt={`${card.id} cover`} onClick={handleClick} />
            </li>

        </div>
    )
}

export default Item