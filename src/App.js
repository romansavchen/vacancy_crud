import React from "react";
import { Route, Switch} from 'react-router-dom';
import Vacancies from './views/Vacansies';
import EditVacancy from "./views/EditVacancy";
import './App.css';


export default function App() {
  return (
    <div className="App">
      <div className="main">
        <Switch>
          <Route exact path="/" component={Vacancies} />
          <Route path="/vacancies" component={EditVacancy} />
        </Switch>
      </div>
    </div>
  );
}
