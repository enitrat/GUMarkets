import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toEthPrice } from '../utils/getProtoCollection'
import { sellAsset, fillOrder, getCheapestSellOrders } from '../utils/ImmutableXConnection.js'
import { BuyButton, SellButton } from '../styles/GlobalStyle'


function OwnedPopup({ showPopup, setPopup, popupCard }) {

    const [sellPrice, setSellPrice] = useState(null)
    const [isLoading, setLoading] = useState(false);
    const [orders, setOrders] = useState([])

    async function fetchCheapestSellOrders() {
        setLoading(true)
        try {
            const json = JSON.stringify(
                {
                    "proto": [`${popupCard.metadata.proto}`],
                    "quality": [`${popupCard.metadata.quality}`]
                }
            );
            const myOrders = await getCheapestSellOrders(5, '', json)
            setOrders(myOrders.orders)
            console.log(myOrders)

        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchCheapestSellOrders();
    }, [])

    const handleClose = () => {
        setPopup(!showPopup)

    }

    const handleSell = async () => {
        console.log("SELL ORDER", sellPrice)
        console.log("asset ID", popupCard.id);
        console.log("tokenAddress", popupCard.token_address)
        try {
            await sellAsset(popupCard, sellPrice);
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        setSellPrice(e.target.value)
    }

    const handleBuy = (e) => {
        console.log(e.target.value)
        fillOrder(e.target.value)
    }

    return (
        <>
            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{popupCard.metadata.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ?
                        <div className="container d-flex justify-content-center">
                            <Spinner animation="grow" /> </div>
                        :
                        <div>
                            <p>Quality : {popupCard.metadata.quality}</p>
                            <div className="container d-flex justify-content-center">
                                <img src={popupCard.image_url} alt={popupCard.id}></img>
                            </div>
                            <p>For sale:
                                {orders.map((order) => (
                                    <p><BuyButton value={order.order_id} onClick={handleBuy}>BUY</BuyButton> : {toEthPrice(order.buy.data.quantity)} </p>
                                )
                                )}</p>
                        </div>}
                </Modal.Body>
                <Modal.Footer>
                    <div className="container d-flex content-center">
                        <input type="text" name="ethprice" placeHolder="eth Price" onChange={handleChange} />
                        <SellButton onClick={handleSell}>Sell yours</SellButton>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default OwnedPopup