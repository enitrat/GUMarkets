import { useState, useEffect } from 'react'
import Axios from 'axios'
import Popup from './Popup'
import styled from 'styled-components'
import { ImageWrapper } from '../styles/GlobalStyle'


function OwnedCard({ card, showPopup, setPopup, popupCard, setPopupCard }) {



    const handleClick = () => {
        setPopup(!showPopup)
        setPopupCard(card)
    }

    return (
        <div className="lol">
            <li key={card.id}>
                <ImageWrapper>
                    <img className='nft-item-cover' src={card.image_url} alt={`${card.id} cover`} onClick={handleClick} />
                </ImageWrapper>
            </li>

        </div>
    )
}

export default OwnedCard