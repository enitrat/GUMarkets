import Home from '../pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import { setupAndLogin, client, getCheapestSellOrders } from '../utils/ImmutableXConnection.js'
import { useEffect, useState } from 'react'
import { ImmutableXClient } from '@imtbl/imx-link-lib';
import { Link } from '@imtbl/imx-link-sdk';
import { ETHTokenType } from '@imtbl/imx-link-types';

function App() {

	return (
		<div>
			<Home />

		</div>
	);

}
export default App;
