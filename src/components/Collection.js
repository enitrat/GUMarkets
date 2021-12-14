import { useState, useEffect } from 'react'
import Item from './Item'
import '../styles/Collection.css'
import { Spinner } from 'react-bootstrap'
import { getAllProtos } from '../utils/apiCalls'
import { SearchWrapper, Parallax, CardWrapper, SearchBar } from '../styles/GlobalStyle'
import styled from 'styled-components'

function Collection({ showPopup, setPopup }) {
    const [allProtos, setAllProtos] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [searchParam, setSearchParam] = useState("");



    async function initPage() {
        try {
            setLoading(true)
            const myProtos = await getAllProtos();
            setAllProtos(myProtos)
            console.log(myProtos)
            setLoading(false)
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        initPage();
    }, [])


    const handleInput = (e) => {
        setSearchParam(e.target.value.toLowerCase())
    }

    return (
        <>
            <SearchWrapper className="container d-flex justify-content-center">
                <SearchBar type="text" placeholder="Search a card" onChange={handleInput} />
            </SearchWrapper>
            {isLoading ?
                <div className="container d-flex justify-content-center">
                    <Spinner animation="grow" />
                </div>
                :
                <ul className="list-unstyled">
                    <div className="container-fluid">
                        <div className="row" style={{ width: "100%" }}>
                            {allProtos.map((proto) => {

                                return (

                                    JSON.parse(proto.metadata).name !== undefined && JSON.parse(proto.metadata).name.toLowerCase().includes(searchParam) &&
                                    <CardWrapper className="col">
                                        <Item key={`${proto.token_proto}`} proto={proto} />
                                    </CardWrapper>

                                )
                            }
                            )}
                        </div>
                    </div>
                </ul>
            }
        </>

    )
}

export default Collection