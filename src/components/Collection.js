import { useState, useEffect } from 'react'
import Item from './Item'
import '../styles/Collection.css'
import { fetchProtoCollection } from '../utils/getProtoCollection'
import { Spinner } from 'react-bootstrap'

function Collection({ showPopup, setPopup, popupCard, setPopupCard }) {
    const [allCards, setAllCards] = useState([])
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(false);

    async function initPage() {
        setLoading(true)
        const assets = await fetchProtoCollection();
        console.log(assets)
        setCards(assets)
        setAllCards(assets)
        setLoading(false)
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
                <input type="text" placeholder="Search a card" onChange={handleInput} />
            </div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <ul className="list-unstyled">
                    <div className="row">
                        {cards.map((card) => (

                            <Item key={card.id} card={card} showPopup={showPopup} setPopup={setPopup} popupCard={popupCard} setPopupCard={setPopupCard} />)
                        )}
                    </div>
                </ul>
            }
        </>

    )
}

export default Collection