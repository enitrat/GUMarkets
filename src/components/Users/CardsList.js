import { useState, useEffect } from 'react'
import useGetNFTs from './useGetNFTs'
import Card from './Card'
import '../../styles/Collection.css'


function CardsList({ address }) {

    const { data: allCards } = useGetNFTs(address);
    const [cards, setCards] = useState(allCards)

    return (
        <div>

            <ul className="list-unstyled">
                <div className="row">
                    {allCards.map((data) => (
                        <Card id={data.id} />
                    )
                    )}
                </div>
            </ul>
        </div>
    )
}

export default CardsList