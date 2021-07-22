import { useState, useEffect } from 'react'
import useGetNFTs from './useGetNFTs'
import Card from './Card'
import '../../styles/Collection.css'


function CardsList({ address }) {

    const { data: allCards, allPrices: allPrices } = useGetNFTs(address);

    const [searchParam, setSearchParam] = useState("");



    const handleInput = (e) => {
        setSearchParam(e.target.value.toLowerCase())
    }



    return (
        <div>
            <div className="container d-flex justify-content-center">
                <input type="text" placeholder="Search a proto" onChange={handleInput} />
            </div>
            <ul className="list-unstyled">
                <div className="row">
                    {allCards.map((data) => (
                        data.metadata.name.toLowerCase().includes(searchParam) && <Card data={data} allPrices={allPrices} />
                    )
                    )}
                </div>
            </ul>
        </div>
    )
}

export default CardsList