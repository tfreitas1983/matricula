import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Login from "./components/login.component.js"
//import Dashboard from "./components/dashboard.component.js"

import Pedido from "./components/pedido.component.js"
import Status from "./components/pedido-status.component.js"

class App extends Component {
  render() {
  
    return (
      <Router>
          <div>              
            <Switch>
              <Route exact path={"/"} component={Login} />
              <Route exact path={"/login"} component={Login} />
              {/* <Route exact path={"/dashboard"} component={Dashboard} />  */}
              <Route exact path={"/solicita-vaga"} component={Pedido} />
              <Route exact path={"/painel-solicitacao/:id"} component={Status} />     
            </Switch>
          </div>
      </Router>
    )
  }
}

export default App;