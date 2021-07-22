import useCard from "./useCard";
import Item from "../Item";

function Card({ data, allPrices }) {
    const { buyPrice, proto } = useCard(data, allPrices);
    const actualPrice = () => {
        try {
            return (allPrices.filter((data) => data.token_proto === proto.token_proto)[0].price)
        } catch (err) {
            return undefined
        }
    }

    const diff = () => {
        return (actualPrice() - buyPrice).toFixed(2)
    }

    return (
        <div>
            {proto.token_proto !== null && (
                <div className="jumbotron container justify-content-center">
                    <Item key={`${proto.token_proto}`} proto={proto} />
                    <p>buying price : {buyPrice} </p>
                    <span> actual price : {actualPrice()}</span>
                    <span> diff : {diff()}</span>
                </div>)
            }


        </div>
    )

}

export default Card