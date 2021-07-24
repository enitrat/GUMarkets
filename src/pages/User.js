import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../components/Users/CardsList";
import { CollectionWrapper } from '../styles/GlobalStyle'

function User() {

    const { id: address } = useParams();
    return (
        <CollectionWrapper>
            <CardsList address={address} />
        </CollectionWrapper>
    )
}

export default User