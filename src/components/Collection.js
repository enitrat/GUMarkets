import { useState, useEffect } from 'react'
import Item from './Item'
import '../styles/Collection.css'
import { Spinner } from 'react-bootstrap'
import { getAllProtos } from '../utils/apiCalls'

function Collection({ showPopup, setPopup }) {
    const [allProtos, setAllProtos] = useState([])
    const [protos, setProtos] = useState([])
    const [isLoading, setLoading] = useState(false);

    async function initPage() {
        setLoading(true)
        const myProtos = await getAllProtos();
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
                        {protos.map((proto) => (

                            <Item key={`${proto.token_proto}`} proto={proto}></Item>
                        ))}
                    </div>
                </ul>
            }
        </>

    )
}

export default Collection