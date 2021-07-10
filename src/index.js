import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/Account'
import Header from './components/Header'
import { LoggedProvider } from './utils/context'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LoggedProvider>
				<Header />
				<Route exact path="/">
					<Redirect to="/browse" />
				</Route>
				<Route path="/browse">
					<Home />
				</Route>
				<Route path="/account">
					<Account />
				</Route>
			</LoggedProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
