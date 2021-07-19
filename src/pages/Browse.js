import { useState, useEffect } from 'react'
import Collection from "../components/Collection"
import Popup from '../components/Popup'
import { fetchProtoCollection } from '../utils/getProtoCollection'
import { getAllProtos } from '../utils/apiCalls'

function Browse() {

    //Dans la page Browse, on affiche la totalité des ordres (uniques) en 

    const [protos, setProtos] = useState([])

    const getProtos = (async () => {
        try {
            var myProtos = await getAllProtos();
            setProtos(myProtos)
        } catch (err) {
            console.log(err)
        }
    });

    useEffect(() => {
        getProtos();
        console.log(protos)
    }, [])

    return (
        <div className="container">
            <Collection />
        </div>
    )
}

export default Browse