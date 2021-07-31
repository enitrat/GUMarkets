import Item from "../../Item";
import { CardWrapper } from '../../../styles/GlobalStyle'
import useGetTrades from './useGetTrades'
import HistoryCard from './HistoryCard'

function HistoryList({ address }) {

    const { history, activeTrades } = useGetTrades(address);
    console.log(activeTrades)

    return (
        <>
            {history.map((trade) => {

                return (
                    <ul className="list-unstyled">
                        <div className="row" style={{ width: "100%" }}>
                            <HistoryCard trade={trade} address={address} />
                        </div>
                    </ul>

                )
            }
            )}
        </>


    )

}

export default HistoryList