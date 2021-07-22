import { useState, useEffect } from 'react'
import useGetNFTs from './useGetNFTs'
import Card from './Card'
import WalletData from './WalletData'
import '../../styles/Collection.css'
import { Spinner } from 'react-bootstrap'


function CardsList({ address }) {

    /**
     * useGetNFTs retourne une liste de toutes les cartes détenues par le compe en question
     * sous forme : 
     * [
     *      {   
     *      actualPrice: "0.58"
            buyPrice: "0.51"
            collection: {name: "Gods Unchained", icon_url: null}
            created_at: "2021-04-06T16:39:26.376618Z"
            description: null
            diffPrice: "0.07"
            id: "0x086821ef4b22e79493e8487265466f21755de7d24b0e34acb77d124b9ae8f443"
            image_url: "https://card.godsunchained.com/?id=917&q=3"
            metadata: {god: "neutral", set: "trial", mana: 2, name: "Vow of Champions", type: "card", …}
            name: "Vow of Champions"
            status: "imx"
            token_address: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c"
            token_proto: "917-3"
            updated_at: "2021-07-22T08:29:39.46108Z"
            uri: null
            user: "0xc137fba1f3438f2512b035e2d16274421d0249db"
     *      }
     * ]
     */
    const { data: userCards, isLoading } = useGetNFTs(address);

    const [searchParam, setSearchParam] = useState('');



    const handleInput = (e) => {
        setSearchParam(e.target.value.toLowerCase())
    }



    return (
        <div>
            <div className="container d-flex justify-content-center">
                <input type="text" placeholder="Search a proto" onChange={handleInput} />
            </div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <>
                    <WalletData assets={userCards} />
                    <ul className="list-unstyled">
                        <div className="row">
                            {userCards.map((card) => (

                                card.metadata.name.toLowerCase().includes(searchParam) && <Card data={card} />
                            )
                            )}
                        </div>
                    </ul>
                </>}

        </div>
    )
}

export default CardsList