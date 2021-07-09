import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import { setupAndLogin, client, getCheapestSellOrders } from '../utils/ImmutableXConnection.js'
import { useEffect, useState } from 'react'
import { ImmutableXClient } from '@imtbl/imx-link-lib';
import { Link } from '@imtbl/imx-link-sdk';
import { ETHTokenType } from '@imtbl/imx-link-types';

function App() {

	const [funds, setFunds] = useState('undefined');

	useEffect(() => {
		console.log(localStorage.getItem('address'));
	}, [])

	const link = new Link('https://link.uat.x.immutable.com');


	async function register() {

		// Register user, you can persist address to local storage etc.
		const { address } = await link.setup({});
		localStorage.setItem('address', address);

	}

	async function deposit() {
		// Deposit ETH into IMX
		link.deposit({
			type: ETHTokenType.ETH,
			amount: '0.001',
		});
	}

	const handleConnect = () => {
		register()
	}

	const handleClick = () => {
		deposit()
	}

	const showFunds = () => {
		getUserInfo()
	}

	async function getUserInfo() {
		const client = await ImmutableXClient.build({ publicApiUrl: 'https://api.uat.x.immutable.com/v1/' });
		const address = localStorage.getItem('address');
		console.log("adresse")
		console.log(address)

		if (address) {
			const balances = await client.getBalances({ user: address });
			const orders = await client.getOrders();
			const order = await client.getOrder({ orderId: 1 });
			const assets = await client.getAssets({
				user: address,
			});
			setFunds(balances.imx.toNumber() * Math.pow(10, -18))
		}


	}
	return (
		<div>
			<Header />
			<button onClick={handleConnect}>LOG IN </button>
			<button onClick={handleClick}>DEPOSIT TO IMX </button>
			<button onClick={showFunds}>SHOW FUNDS</button>
			<h2>{funds} ETH </h2>
			<Home />

		</div>
	);

}
export default App;
