import useWalletData from './useWalletData'
import { Spinner } from 'react-bootstrap'


function WalletData({ assets, points }) {
    const { investment, values, roi, isLoading } = useWalletData(assets);

    return (
        <div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <>
                    investment : {investment.toFixed(2)},
                    value : {values.toFixed(2)},
                    roi : {roi.toFixed(2)}
                    points : {points.toFixed(2)},
                    estimated IMX airdrop : {(400000 * points / 70284757).toFixed(2)}
                </>
            }

        </div>
    )
}

export default WalletData