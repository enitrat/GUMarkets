import useCard from "./useCard";
import Item from "../Item";
import { CardWrapper } from '../../styles/GlobalStyle'

function Card({ data }) {




    return (
        <CardWrapper className="col">
            {(data.token_proto && data.buyPrice !== undefined) && (
                <div>
                    <Item key={`${data.token_proto}`} proto={data} />
                    <p>buying price : {data.buyPrice} </p>
                    <span> actual price : {data.actualPrice}</span>
                    <span> diff : {data.diffPrice}</span>

                </div>)
            }


        </CardWrapper>
    )

}

export default Card