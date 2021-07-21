import { ImageWrapper } from '../../styles/GlobalStyle'
import { Link } from 'react-router-dom'


function DiscountItem({ proto }) {


    const handleClick = () => {

    }

    return (
        <div>
            <li key={proto.token_proto}>
                <ImageWrapper>
                    <Link to={`/godsunchained/protos/${proto.token_proto}`}>
                        <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${proto.token_proto.split('-')[0]}&q=${proto.token_proto.split('-')[1]}`} alt={`${proto.token_proto} cover`} onClick={handleClick} />
                        <span>-{proto.diff}%</span>
                    </Link>
                </ImageWrapper>
            </li>

        </div>
    )
}

export default DiscountItem