import { ImageWrapper, CardWrapper, InfoWrapper } from '../styles/GlobalStyle'
import { Link } from 'react-router-dom'


function Item({ proto }) {


    const handleClick = () => {

    }

    return (
        <CardWrapper className="col">
            <li key={proto.token_proto}>
                <ImageWrapper>
                    <Link to={`/godsunchained/protos/${proto.token_proto}`}>
                        <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${proto.token_proto.split('-')[0]}&q=${proto.token_proto.split('-')[1]}`} alt={`${proto.token_proto} cover`} onClick={handleClick} />
                    </Link>
                </ImageWrapper>
                {proto.price !== undefined &&
                    <InfoWrapper>
                        <span>
                            {JSON.parse(proto.metadata).name}
                        </span>
                        <span>
                            {proto.price}$
                        </span>
                    </InfoWrapper>
                }

            </li>


        </CardWrapper>
    )
}

export default Item