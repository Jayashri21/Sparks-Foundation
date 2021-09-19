import React from 'react';
import './App.css';
import Home from './Home';
import ViewCustomer from './Table_customer';
import Navbar from "./Navbar";
import Transfer from "./Transfer";
import Create from "./Create";
import HistoryPage from "./HistoryPage";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


function App() {
  return (
      <React.Fragment>
        <Router >
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/customer" component={ViewCustomer}/>
            <Route exact path="/customer/create/history" component={HistoryPage}/>
            <Route exact path="/customer/create" component={Create}/>
            <Route exact path="/customer/:product_id" component={Transfer}/>
          </Switch>
        </Router>
      </React.Fragment>
  );
}

export default App;
