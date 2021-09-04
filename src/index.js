import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import LinkWrapper from './components/LinkWrapper';
import Account from './pages/Account'
import Header from './components/Header'
import Discounts from './pages/Discounts'
import Browse from './pages/Browse'
import Details from './pages/Details'
import User from './pages/User'
import EthTransfer from './pages/EthTransfer';
import './styles/all.css'
import { Parallax } from './styles/GlobalStyle'

import { LoggedProvider } from './utils/context'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LoggedProvider>
				<Parallax>
					<Header />
					<Route exact path="/godsunchained">
						<Redirect to="/godsunchained/browse" />
					</Route>
					<Route path="/godsunchained/browse">
						<Browse />
					</Route>
					<Route path="/godsunchained/account">
						<Account />
					</Route>
					<Route path="/godsunchained/discounts">
						<Discounts />
					</Route>
					<Route path="/godsunchained/protos/:id">
						<Details />
					</Route>
					<Route path="/godsunchained/user/:id/:type">
						<User />
					</Route>
					<Route path="/godsunchained/send">
						<EthTransfer />
					</Route>
				</Parallax>
			</LoggedProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
