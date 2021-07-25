import { useState, useEffect } from 'react'
import DiscountItem from './DiscountItem'
import '../../styles/Collection.css'
import { Spinner } from 'react-bootstrap'
import { getDiscounts } from '../../utils/apiCalls'
import { SearchWrapper, CardWrapper, SearchBar } from '../../styles/GlobalStyle'


function DiscountsCollection({ showPopup, setPopup }) {
    const [allProtos, setAllProtos] = useState([])
    const [protos, setProtos] = useState([])
    const [isLoading, setLoading] = useState(false);

    async function initPage() {
        setLoading(true)
        const myProtos = await getDiscounts();
        setAllProtos(myProtos)
        setProtos(myProtos)
        setLoading(false)
    }

    useEffect(() => {
        initPage();
    }, [])

    useEffect(() => {
        console.log(protos)
    }, [protos])

    const handleInput = (e) => {
        const filteredResult = allProtos.filter((proto) => {
            let metadata = JSON.parse(proto.metadata)
            return metadata.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setProtos(filteredResult)
    }



    return (
        <>
            <SearchWrapper className="container d-flex justify-content-center">
                <SearchBar type="text" placeholder="Search a card" onChange={handleInput} />
            </SearchWrapper>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <ul className="list-unstyled">
                    <div className="row" style={{ width: "100%" }}>
                        {Object.keys(protos).map((key) => {
                            return (
                                <CardWrapper className="col">
                                    <DiscountItem key={`${protos[key].token_proto}`} proto={protos[key]}></DiscountItem>
                                </CardWrapper>
                            )
                        }
                        )}
                    </div>
                </ul>
            }
        </>

    )
}

export default DiscountsCollection