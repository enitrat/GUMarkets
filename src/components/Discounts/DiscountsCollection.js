import { useState, useEffect } from 'react'
import DiscountItem from './DiscountItem'
import '../../styles/Collection.css'
import { Spinner } from 'react-bootstrap'
import { getDiscounts } from '../../utils/apiCalls'

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
            <div className="container d-flex justify-content-center">
                <input type="text" placeholder="Search a proto" onChange={handleInput} />
            </div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <ul className="list-unstyled">
                    <div className="row">
                        {Object.keys(protos).map((key) => (

                            <DiscountItem key={`${protos[key].token_proto}`} proto={protos[key]}></DiscountItem>
                        ))}
                    </div>
                </ul>
            }
        </>

    )
}

export default DiscountsCollection