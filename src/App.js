import React, {useState} from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import {Route, Switch} from "react-router-dom";
import Authorization from "./components/Authorization";
import HistoryPage from "./components/HistoryPage";

const App = () => {
    const [history, setHistory] = useState([]);
    const [count, setCount] = useState(0);

    const addToHistory = (search) => {
        if (count > 9) {
            history.shift();
            history.push(search);
            setHistory(history);
        } else {
            history.push(search);
            setHistory(history);
        }
        setCount(count+1)
    };

  return (
      <Switch>
          <Route path={['/', '/authorization']} exact component={Authorization}/>
          <Route path={['/main_page', '/main_page/:item']} exact render={() => <MainPage addToHistory={addToHistory}/>}/>}/>
          <Route path='/history_page' render={() => <HistoryPage history={history}/>}/>
          <Route component={Authorization}/>
      </Switch>
  )
};

export default App;
