import { useState, useEffect } from 'react'
import Axios from 'axios'
import OwnedCard from './OwnedCard'
import styled from 'styled-components'
import '../styles/Collection.css'
import { fetchAssets } from '../utils/getProtoCollection'
import { getAllUserAssets } from '../utils/ImmutableXConnection'

function OwnedCollection({ showPopup, setPopup, popupCard, setPopupCard }) {

    const CardWrapper = styled.div`
    
  `

    const [allCards, setAllCards] = useState([])
    const [cards, setCards] = useState([])




    async function initPage() {
        try {
            const assets = await getAllUserAssets();
            setCards(assets)
            setAllCards(assets)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        initPage();
    }, [])

    useEffect(() => {
        console.log(cards)
    }, [cards])

    const handleInput = (e) => {
        const filteredResult = allCards.filter((card) => card.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setCards(filteredResult)
    }



    return (
        <>
            <div className="container d-flex justify-content-center">
                <input type="text" onChange={handleInput} placeholder="Search a card" />
            </div>
            <ul className="list-unstyled">
                <div className="row">
                    {cards.map((card) => (
                        <CardWrapper>
                            <OwnedCard key={card.id} card={card} showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />
                        </CardWrapper>
                    )
                    )}
                </div>
            </ul>
        </>

    )
}

export default OwnedCollection