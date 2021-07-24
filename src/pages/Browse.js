import { useState, useEffect } from 'react'
import Collection from "../components/Collection"
import Popup from '../components/Popup'
import { fetchProtoCollection } from '../utils/getProtoCollection'
import { getAllProtos } from '../utils/apiCalls'
import { CollectionWrapper } from '../styles/GlobalStyle'

function Browse() {

    //Dans la page Browse, on affiche la totalité des ordres (uniques) en 


    return (
        <CollectionWrapper >
            <Collection />
        </CollectionWrapper>
    )
}

export default Browse