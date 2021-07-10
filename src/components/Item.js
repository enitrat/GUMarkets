import { ImageWrapper } from '../styles/GlobalStyle'


function Item({ card, showPopup, setPopup, popupCard, setPopupCard }) {


    const handleClick = () => {
        setPopup(!showPopup)
        setPopupCard(card)
    }

    return (
        <div>
            <li key={card.id}>
                <ImageWrapper>
                    <img className='nft-item-cover' src={`https://card.godsunchained.com/?id=${card.id}&q=4`} alt={`${card.id} cover`} onClick={handleClick} />
                </ImageWrapper>
            </li>

        </div>
    )
}

export default Item