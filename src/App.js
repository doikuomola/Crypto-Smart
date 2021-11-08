import './App.css';
import Header from './components/Header';
import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  }
})



function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
        <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/coins/:id" component={CoinPage} />
      </Switch>
    </div>
  );
}

export default App;
