import useCard from "./useCard";
import Item from "../Item";

function Card({ id }) {
    const { buyPrice, proto, actualPrice } = useCard(id);

    return (
        <div>
            {proto.token_proto !== null && (
                <div>
                    <Item key={`${proto.token_proto}`} proto={proto} />
                    <span>buying price : {buyPrice} </span>
                    <span> actual price : {actualPrice}</span>
                    <span> diff : {(actualPrice - buyPrice).toFixed(2)}</span>
                </div>)
            }


        </div>
    )

}

export default Card