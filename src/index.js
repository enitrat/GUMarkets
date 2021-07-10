import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/App'
import Home from './pages/Home'
import Account from './pages/Account'
import Header from './components/Header'
import { LoggedProvider } from './utils/context'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LoggedProvider>
				<Header />
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/browse">
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
