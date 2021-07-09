import { useState, useEffect } from 'react'
import Axios from 'axios'
import Item from './Item'
import '../styles/Collection.css'

function Collection({ showPopup, setPopup, popupCard, setPopupCard }) {
    const [allCards, setAllCards] = useState([])
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetchAPIdata();
    }, [])

    useEffect(() => {
        console.log(cards)
    }, [cards])

    const handleInput = (e) => {
        const filteredResult = allCards.filter((card) => card.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setCards(filteredResult)
    }

    const fetchAPIdata = async () => {
        let url = 'https://api.godsunchained.com/v0/proto?perPage=2000'
        const response = await Axios(url)
        const assets = response.data.records
        console.log(assets)
        setCards(assets)
        setAllCards(assets)
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