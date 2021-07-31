import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../components/Users/CardsList";
import HistoryList from "../components/Users/History/HistoryList"
import { CollectionWrapper } from '../styles/GlobalStyle'
import { Link } from 'react-router-dom'

function User() {

    const { id: address } = useParams();
    const { type: type } = useParams();


    return (
        <>
            <p>{console.log(type)}</p>
            {type === "history" && <HistoryList address={address}></HistoryList>}
            {type !== "history" && <CardsList address={address} />}
        </>
    )
}

export default User