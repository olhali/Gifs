import React from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import {Route, Switch, Redirect} from "react-router-dom";
import Authorization from "./components/Authorization";
import HistoryPage from "./components/HistoryPage";

const App = () => {

    const isAuthenticated = () => {
        if (sessionStorage.getItem('session') !== null){
            return true;
        } else {
            return false;
        }
    };

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={() => {
                return isAuthenticated() === true
                    ? children
                    : <Redirect to='/authorization'/>
            }} />
        )
    }

  return (
      <Switch>
          <Route path={['/', '/authorization']} exact component={Authorization}/>
          <PrivateRoute path={['/main_page', '/main_page/:item']}>
              <MainPage/>
          </PrivateRoute>
          <PrivateRoute path='/history_page'>
              <HistoryPage/>
          </PrivateRoute>
          <Route component={Authorization}/>
      </Switch>
  )
};

export default App;
