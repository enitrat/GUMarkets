import styled from "styled-components";
import Chart from '../Chart'
import { BuyButton } from '../../styles/GlobalStyle'
import { fillOrder } from '../../utils/ImmutableXConnection'
import '../../styles/details.css'


function GeneralTab({ proto, quality, id, orders, price, getQuality }) {
    const Pcontainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content : center;
    align-items:center;
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `

    async function handleBuy(e) {
        try {
            await fillOrder(e.target.value);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Pcontainer>
                <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${proto}&q=${quality}`} alt={`${id} cover`} />
                <Chart proto={proto} quality={getQuality(quality)} type={"month-avg"} />

            </Pcontainer>
            <div className="d-flex justify-content-center">
                <p>For sale:
                    {orders.map((order) => {
                        return (
                            <p><BuyButton value={order.order_id} onClick={handleBuy}>{order.buy.data.quantity} USD </BuyButton></p>
                        )
                    }
                    )}</p>
            </div>
        </>
    )
}

export default GeneralTab