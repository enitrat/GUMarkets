import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCheapestUSDSellOrders } from '../utils/apiCalls'
import { Modal, Button, Spinner } from 'react-bootstrap';
import styled from "styled-components";
import Chart from '../components/Chart'
import { BuyButton, Parallax } from '../styles/GlobalStyle'
import { fillOrder } from '../utils/ImmutableXConnection'
import '../styles/details.css'
import NewOwners from "../components/NewOwners";
import GeneralTab from '../components/Details/GeneralTab'
import DetailedTab from '../components/Details/DetailedTab'





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
            setOrders(orders)
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



    return (
        <Parallax>
            {isLoading ?
                <div className="container d-flex justify-content-center">
                    <Spinner animation="grow" /> </div>
                :
                error ? <h5>this card is not available for trade</h5> :

                    <div>
                        <div className="bloc-tabs" style={{ "background-color": "transparent" }}>
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

                        <div className="content-tabs" style={{ "background-color": "transparent" }}>
                            <div
                                className={toggleState === 1 ? "content  active-content" : "content"} style={{ "background-color": "transparent" }}
                            >
                                <GeneralTab proto={proto} quality={quality} id={id} orders={orders} price={price} getQuality={getQuality} />

                            </div>
                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"} style={{ "background-color": "transparent" }}
                            >
                                <DetailedTab proto={proto} quality={quality} id={id} orders={orders} price={price} getQuality={getQuality} />

                            </div>
                        </div>
                    </div>

            }
        </Parallax>
    )

}

export default Details