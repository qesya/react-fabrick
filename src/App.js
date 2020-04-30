import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import AccountPage from './Components/accountPage'
import AccountDetails from './Components/detailsPage'
import BankTransfer from './Components/bankTransfer'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={AccountPage}
          />
          <Route
            exact
            path='/account/'
            component={AccountDetails}
          />
          <Route
            exact
            path='/banktranfer/'
            component={BankTransfer}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
