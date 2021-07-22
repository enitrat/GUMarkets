import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LinkWrapper from './components/LinkWrapper';
import Home from './pages/Home'
import Account from './pages/Account'
import Header from './components/Header'
import Discounts from './pages/Discounts'
import Browse from './pages/Browse'
import Details from './pages/Details'
import User from './pages/User'

import { LoggedProvider } from './utils/context'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LoggedProvider>
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
				<Route path="/godsunchained/user/:id">
					<User />
				</Route>
			</LoggedProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
