
import { SearchWrapper, Parallax, SearchBar, CardWrapper } from '../../../styles/GlobalStyle'
import Item from "../../Item";


function HistoryCard({ trade, address }) {
    return (
        <>
            <CardWrapper className="col">
                <div>
                    <Item key={`${trade.token_proto}`} proto={trade} />
                    {trade.makerAddress.toLowerCase() !== address ? <p>buy price : {trade.usd_price} </p> : <p>sell price : {trade.usd_price} </p>}

                </div>
            </CardWrapper>
        </>
    )
}

export default HistoryCard