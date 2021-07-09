import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';

function Popup({ showPopup, setPopup, popupCard }) {

    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [quality, setQuality] = useState("Meteorite")
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    var minPrice = Number.MAX_SAFE_INTEGER

    const fetchPrice = async () => {
        setLoading(true)
        let url = 'https://api.x.immutable.com/v1/orders'
        const json = JSON.stringify(
            {
                "proto": [`${popupCard.id}`],
                "quality": [`${quality}`]
            }
        );
        try {
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
            console.log(result)
            result.map((order) => {

                let quantity = order.buy.data.quantity
                let decimals = order.buy.data.decimals
                let currentPrice = (quantity * Math.pow(10, -decimals)).toFixed(6)
                minPrice = minPrice > currentPrice ? currentPrice : minPrice
            })

            const image_url = result[0].sell.data.properties.image_url;

            setPrice(minPrice)
            setImage(image_url)
        } catch (err) {
            setError(true);
            console.log("erreur")
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchPrice();
    }, [])

    useEffect(() => {
        fetchPrice();
    }, [quality])

    const handleClose = () => {
        setPopup(!showPopup)

    }

    const handleMeteorite = () => {
        setQuality("Meteorite")

    }
    const handleShadow = () => {
        setQuality("Shadow")
        console.log("Shadow")

    }
    const handleGold = () => {
        setQuality("Gold")

    }

    const handleDiamond = () => {
        setQuality("Diamond")
    }

    return (
        <>

            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{popupCard.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ?
                        <div className="container d-flex justify-content-center">
                            <Spinner animation="grow" /> </div>
                        :
                        <div>
                            <p>Quality : {quality}</p>
                            <p>Price : {price}</p>
                            <div className="container d-flex justify-content-center">
                                <img src={image} alt={popupCard.id}></img>
                            </div>
                            <button>BUY</button>
                            <button>SELL</button>
                        </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleMeteorite}>
                        Meteorite
                    </Button>
                    <Button variant="primary" onClick={handleShadow}>
                        Shadow
                    </Button>
                    <Button variant="warning" onClick={handleGold}>
                        Gold
                    </Button>
                    <Button variant="link" onClick={handleDiamond}>
                        Diamond
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Popup