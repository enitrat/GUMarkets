import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';
import { sellAsset, fillOrder } from '../utils/ImmutableXConnection.js'


function OwnedPopup({ showPopup, setPopup, popupCard }) {

    const [sellPrice, setSellPrice] = useState(null)
    const [isLoading, setLoading] = useState(false);

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
                        </div>}
                </Modal.Body>
                <Modal.Footer>
                    <label>
                        ETH price : <input type="text" name="ethprice" onChange={handleChange} />
                    </label>
                    <button onClick={handleSell}>SELL</button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default OwnedPopup