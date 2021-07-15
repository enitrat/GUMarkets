import '../styles/Popup.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';
import { sellAsset, fillOrder, getOrdersHistory, getCheapestSellOrders, getPriceHistory } from '../utils/ImmutableXConnection.js'
import { fetchBestPrice } from '../utils/getProtoCollection'
import { BuyButton, SellButton } from '../styles/GlobalStyle'
import Chart from './Chart'
import styled from 'styled-components';



function Popup({ showPopup, setPopup, popupCard }) {

    const [price, setPrice] = useState(null);
    const [orderID, setOrderID] = useState(null);
    const [image, setImage] = useState(null);
    const [quality, setQuality] = useState("Meteorite")
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const Pcontainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content : center;
  align-items:center;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

    async function init() {
        setLoading(true)
        try {
            setError(false)
            //get best price for this card
            const { bestOrder, image_url } = await fetchBestPrice(popupCard, quality);
            setPrice(bestOrder.minPrice)
            setOrderID(bestOrder.orderID)
            setImage(image_url)
            if (bestOrder.orderID === null) {
                setError(true)
            }

        } catch (err) {
            setError(true);
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        init(popupCard, quality);
    }, [])

    useEffect(() => {
        init(popupCard, quality);
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

    const handleSell = () => {
        sellAsset('0x843279e9ee4e64ff7a4d8743df80e5a914ff8053ee40a15b6d7b6a5b195e8375', '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c', 0.01)
    }

    async function handleBuy() {
        try {
            console.log(orderID.toString());
            await fillOrder(orderID.toString());
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>

            <Modal show={showPopup} onHide={handleClose} dialogClassName="modal-80w">
                <Modal.Header closeButton>
                    <Modal.Title>{popupCard.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ?
                        <div className="container d-flex justify-content-center">
                            <Spinner animation="grow" /> </div>
                        :
                        error ? <h5>this card is not available for trade</h5> :
                            <div>
                                <p>Quality : {quality}</p>
                                <p>Price : {price}</p>
                                <Pcontainer>
                                    <img src={image} alt={popupCard.id}></img>
                                    <Chart proto={popupCard.id} quality={quality} />
                                </Pcontainer>
                                <div className="d-flex justify-content-center">
                                    <BuyButton onClick={handleBuy}>Buy</BuyButton>
                                </div>
                            </div>

                    }

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