import React from 'react';
import './App.css';
import PokemonsList from './components/PokemonsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CategoryList from './components/CategoryList'

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/items">
            <Header isSearch={false}/>
            <CategoryList />
          </Route>
          <Route path="/">
            <Header isSearch={true}/>
            <PokemonsList />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
