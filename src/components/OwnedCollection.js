import { useState, useEffect } from 'react'
import OwnedCard from './OwnedCard'
import styled from 'styled-components'
import '../styles/Collection.css'
import { getAllUserAssets } from '../utils/ImmutableXConnection'
import { Spinner } from 'react-bootstrap'

function OwnedCollection({ showPopup, setPopup, popupCard, setPopupCard }) {



    const CardWrapper = styled.div`
    
  `

    const [allCards, setAllCards] = useState([])
    const [cards, setCards] = useState([])
    const [isLoading, setLoading] = useState(false);




    async function initPage() {
        setLoading(true)
        try {
            const assets = await getAllUserAssets();
            setCards(assets)
            setAllCards(assets)
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
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
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
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
            }
        </>

    )
}

export default OwnedCollection