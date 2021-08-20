import useWalletData from './useWalletData'
import { Spinner } from 'react-bootstrap'


function WalletData({ assets, points }) {
    const { investment, values, roi, isLoading } = useWalletData(assets);
    const totalPoints = 101539397;
    const totalDistributedImx = 400000;
    return (
        <div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <>
                    investment : {investment.toFixed(2)},
                    value : {values.toFixed(2)},
                    roi : {roi.toFixed(2)}
                    points : {points.toFixed(2)},
                    estimated IMX airdrop : {(totalDistributedImx * points / totalPoints).toFixed(2)}
                </>
            }

        </div>
    )
}

export default WalletData