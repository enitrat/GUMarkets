import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'

function Popup({ showPopup, setPopup, name }) {

    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [quality, setQuality] = useState("Meteorite")

    var minPrice = Number.MAX_SAFE_INTEGER

    const fetchImg = async () => {
        const json = JSON.stringify(
            {
                "proto": [`${name}`],
                "quality": [`${quality}`]
            }
        );
        console.log(json)
        let url = 'https://api.x.immutable.com/v1/assets'
        const response = await Axios.get(url,
            {
                params:
                {
                    metadata: json
                }
            })
        const results = response.data.result[1]
        const image_url = results.image_url
        setImage(image_url)
    }

    const fetchPrice = async () => {
        let url = 'https://api.x.immutable.com/v1/orders'
        const json = JSON.stringify(
            {
                "proto": [`${name}`],
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
        const orders = response.data.result
        orders.map((order) => {

            let quantity = order.buy.data.quantity
            let decimals = order.buy.data.decimals
            let currentPrice = (quantity * Math.pow(10, -decimals)).toFixed(6)
            minPrice = minPrice > currentPrice ? currentPrice : minPrice
        })

        setPrice(minPrice)
    }

    useEffect(() => {
        fetchPrice();
        fetchImg();
    }, [])

    const handleClick = () => {
        setPopup(!showPopup)

    }
    return (
        <div className="jumbotron">
            <div className="modal_content">
                <span className="close" onClick={handleClick}>&times;    </span>
                <p>{name}</p>
                <p>{price}</p>
                <img src={image} alt="card-image" />
            </div>
        </div>
    );
}

export default Popup