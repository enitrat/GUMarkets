import { useState, useEffect } from 'react'
import DiscountsCollection from "../components/Discounts/DiscountsCollection"

import { fetchDiscounts } from '../utils/getProtoCollection'
import { CollectionWrapper } from '../styles/GlobalStyle'

function Discounts() {

    const [showPopup, setPopup] = useState(false);
    const [popupCard, setPopupCard] = useState(null)

    console.log(popupCard)

    return (
        < >

        </>
    )
}

export default Discounts