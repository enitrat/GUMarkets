import useWalletData from './useWalletData'
import { Spinner } from 'react-bootstrap'


function WalletData({ assets }) {
    const { investment, values, roi, isLoading } = useWalletData(assets);

    return (
        <div>
            {isLoading ? <div className="container d-flex justify-content-center">
                <Spinner animation="grow" /> </div> :
                <>
                    investment : {investment},
                    value : {values},
                    roi : {roi}
                </>
            }

        </div>
    )
}

export default WalletData