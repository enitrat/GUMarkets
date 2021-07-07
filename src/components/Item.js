import { useState, useEffect } from 'react'
import Axios from 'axios'
import Popup from './Popup'


function Item({ id, image_url, name, showPopup, setPopup, popupName, setPopupName }) {





    const handleClick = () => {
        setPopup(!showPopup)
        setPopupName(name)
    }


    return (
        <div className="card">
            <li key={id}>
                <img className='nft-item-cover' src={image_url} alt={`${id} cover`} onClick={handleClick} />
            </li>

        </div>
    )
}

export default Item