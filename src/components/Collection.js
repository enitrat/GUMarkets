import { useState, useEffect } from 'react'
import Axios from 'axios'
import Item from './Item'

function Collection({ showPopup, setPopup, popupCard, setPopupCard }) {
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetchAPIdata();
    }, [])

    useEffect(() => {
        console.log(cards)
    }, [cards])


    const fetchAPIdata = async () => {
        let url = 'https://api.godsunchained.com/v0/proto?perPage=2000'
        const response = await Axios(url)
        const assets = response.data.records
        console.log(assets)
        setCards(assets)
    }

    return (
        <ul className="list-unstyled">
            <div className="row">
                {cards.map((card) => (

                    <Item key={card.id} card={card} showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />)
                )}
            </div>
        </ul>

    )
}

export default Collection