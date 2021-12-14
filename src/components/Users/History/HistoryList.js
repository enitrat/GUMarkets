import Item from "../../Item";
import { CardWrapper } from '../../../styles/GlobalStyle'
import useGetTrades from './useGetTrades'
import HistoryCard from './HistoryCard'
import React from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function HistoryList({ address }) {

    let type = useQuery().get("type");
    console.log(type)

    const { history, activeTrades, benefs, pending } = useGetTrades(address);
    console.log(activeTrades)

    return (
        <>
            <Link to={`/godsunchained/user/${address}/history?type=active`}>Show unsold cards</Link>
            <br />
            <Link to={`/godsunchained/user/${address}/history?type=all`}>Show all trade cards</Link>
            <br />
            <Link to={`/godsunchained/user/${address}/wallet`}>Show wallet</Link>



            <div>
                <p>Unsold cards : {pending}</p>
                <p>Profits : {benefs}</p>
            </div>
            <ul className="list-unstyled">
                <div className="container-fluid">
                    <div className="row" style={{ width: "100%" }}>
                        {type === "all" ?

                            //A
                            history.map((trade) => {

                                return (<HistoryCard trade={trade} address={address} />)
                            })
                            :
                            //B
                            type === "active" ?
                                activeTrades.map((trade) => {

                                    return (<HistoryCard trade={trade} address={address} />)
                                })
                                //else
                                : null


                        }
                    </div>
                </div>
            </ul>
        </>


    )

}

export default HistoryList