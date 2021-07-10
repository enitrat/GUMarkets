import { useState, useEffect } from 'react'
import Axios from 'axios'
import Item from './Item'
import '../styles/Collection.css'
import { fetchProtoCollection } from '../utils/getProtoCollection'

function Collection({ showPopup, setPopup, popupCard, setPopupCard }) {
    const [allCards, setAllCards] = useState([])
    const [cards, setCards] = useState([])

    async function initPage() {
        const assets = await fetchProtoCollection();
        console.log(assets)
        setCards(assets)
        setAllCards(assets)
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
                <input type="text" onChange={handleInput} />
            </div>
            <ul className="list-unstyled">
                <div className="row">
                    {cards.map((card) => (

                        <Item key={card.id} card={card} showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />)
                    )}
                </div>
            </ul>
        </>

    )
}

export default Collection