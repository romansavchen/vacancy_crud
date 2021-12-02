import React, {useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';

import {Status, Actions} from '../actions/app';
import {ReactComponent as Plus} from '../icons/plus.svg';
import Vacancy from './Vacancy';


export default function Vacancies () {
    const vacancies = useSelector(state => state.app.vacancies);
    const cities = useSelector(state => state.app.cities);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(Actions.GetAllVacancies());
      dispatch(Actions.GetAllCities())
    }, []);

    const createVacancy = () => {
        history.push({pathname: `/vacancies`});
    };

    const removeVacancy = (id) => {
        dispatch(Actions.DeleteVacancy(id));
    };

    return (
        <>
            <header className="App-header">
                <button className="button create" onClick={createVacancy}><Plus className="icon" /></button>
                <p className="title">Found <b>{vacancies.length}</b> vacancies</p>
            </header>
            <div className="vacansies">
            {vacancies.map(vac => {
                    return <Vacancy key={vac.id} vac={vac} cities={cities} removeVacancy={removeVacancy}/>
                })}
            </div>
        </>
    );
}