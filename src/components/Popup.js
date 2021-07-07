import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'

function Popup({ showPopup, setPopup, popupCard }) {

    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [quality, setQuality] = useState("Meteorite")

    var minPrice = Number.MAX_SAFE_INTEGER

    const fetchPrice = async () => {
        let url = 'https://api.x.immutable.com/v1/orders'
        const json = JSON.stringify(
            {
                "proto": [`${popupCard.metadata.proto}`],
                "quality": [`${quality}`]
            }
        );
        const response = await Axios.get(url,
            {
                params:
                {
                    sell_metadata: json,
                    status: 'active',
                    order_by: 'buy_quantity',
                    direction: 'asc',

                }
            })
        const result = response.data.result
        result.map((order) => {

            let quantity = order.buy.data.quantity
            let decimals = order.buy.data.decimals
            let currentPrice = (quantity * Math.pow(10, -decimals)).toFixed(6)
            minPrice = minPrice > currentPrice ? currentPrice : minPrice
        })

        const image_url = result[1].sell.data.properties.image_url;

        setPrice(minPrice)
        setImage(image_url)
    }

    useEffect(() => {
        fetchPrice();
    }, [])

    const handleClick = () => {
        setPopup(!showPopup)

    }
    return (
        <div className="jumbotron">
            <div className="modal_content">
                <span className="close" onClick={handleClick}>&times;    </span>
                <p>{popupCard.name}</p>
                <p>{price}</p>
                <img src={image} alt="card-image" />
            </div>
        </div>
    );
}

export default Popup