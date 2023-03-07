import React from 'react'
import './App.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Session } from './pages/Session'

console.log('ENV', process.env.NODE_ENV)

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/sessions/:clientId" component={Session} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App 

