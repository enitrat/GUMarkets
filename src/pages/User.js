import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../components/Users/CardsList";

function User() {

    const { id: address } = useParams();
    return (
        <div className="container">
            <CardsList address={address} />
        </div>
    )
}

export default User