import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCheapestUSDSellOrders } from '../utils/apiCalls'
import { Modal, Button, Spinner } from 'react-bootstrap';
import styled from "styled-components";
import Chart from '../components/Chart'
import { BuyButton } from '../styles/GlobalStyle'
import { fillOrder } from '../utils/ImmutableXConnection'
import '../styles/details.css'
import NewOwners from "../components/NewOwners";



function Details() {



    const Pcontainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content : center;
    align-items:center;
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `

    var qualities = {
        4: "Meteorite",
        3: "Shadow",
        2: "Gold",
        1: "Diamond"
    };

    const getQuality = (key) => { return qualities[key] }

    const { id } = useParams();
    const [proto, quality] = id.split('-')

    const [price, setPrice] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [orders, setOrders] = useState([])

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };





    async function init() {
        setLoading(true)
        try {
            setError(false)
            //get best price for this card
            const json = JSON.stringify(
                {
                    "proto": [`${proto}`],
                    "quality": [`${getQuality(quality)}`]
                }
            );
            let { orders } = await getCheapestUSDSellOrders(json)
            setPrice(orders[0].buy.data.quantity)
            if (orders[0].orderID === null) {
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
        init();
    }, [])

    async function handleBuy(e) {
        try {
            await fillOrder(e.target.value);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {isLoading ?
                <div className="container d-flex justify-content-center">
                    <Spinner animation="grow" /> </div>
                :
                error ? <h5>this card is not available for trade</h5> :

                    <div>
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(1)}
                            >
                                General info
                            </button>
                            <button
                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(2)}
                            >
                                Detailed Info
                            </button>

                        </div>

                        <div className="content-tabs">
                            <div
                                className={toggleState === 1 ? "content  active-content" : "content"}
                            >
                                <Pcontainer>
                                    <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${proto}&q=${quality}`} alt={`${id} cover`} />
                                    <Chart proto={proto} quality={getQuality(quality)} type={"month-avg"} />

                                </Pcontainer>
                                <div className="d-flex justify-content-center">
                                    <p>For sale:
                                        {orders.map((order) => {
                                            return (
                                                <p><BuyButton value={order.order_id} onClick={handleBuy}>{price} USD </BuyButton></p>
                                            )
                                        }
                                        )}</p>
                                </div>
                            </div>
                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"}
                            >
                                <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${proto}&q=${quality}`} alt={`${id} cover`} />

                                <Pcontainer>
                                    <Chart proto={proto} quality={getQuality(quality)} type={"month-detailed"} />

                                </Pcontainer>
                                <Pcontainer>
                                    <Chart proto={proto} quality={getQuality(quality)} type={"week-detailed"} />

                                </Pcontainer>

                                <div className="last trades">
                                    Last trades :
                                    <NewOwners proto={proto} quality={getQuality(quality)} />

                                </div>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )

}

export default Details