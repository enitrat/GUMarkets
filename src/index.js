import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/App'
import Account from './pages/Account'
import Header from './components/Header'
import { LoggedProvider } from './utils/context'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<LoggedProvider>
				<Header />
				<Route exact path="/">
					<App />
				</Route>
				<Route path="/account">
					<Account />
				</Route>
			</LoggedProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
