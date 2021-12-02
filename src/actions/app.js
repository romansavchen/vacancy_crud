import createReducer from '../utils/createReducer';
import axios from 'axios';

const BASE_SERVER_URL = "http://localhost:3001";

export const Status = {
    INITIALIZING: 'INITIALIZING',
    READY: 'READY',
    ERROR: 'ERROR'
};

const initialState = {
    status: Status.INITIALIZING,
    vacancies: [],
    cities: [],
    suggest: []

};

export const ActionTypes = {
    APP_INITIALIZED: "APP_INITIALIZED",
    GET_VACANCIES: "GET_VACANCIES",
    GET_VACANCIES_SUCCESS: "GET_VACANCIES_SUCCESS",
    GET_VACANCIES_ERROR: "GET_VACANCIES_ERROR",
    GET_CITIES_SUCCESS: "GET_CITIES_SUCCESS",
    GET_CITIES_ERROR: "GET_CITIES_ERROR",
    GET_CITIES_BY_QUERY_SUCCESS: "GET_CITIES_BY_QUERY_SUCCESS",
    GET_CITIES_BY_QUERY_ERROR: "GET_CITIES_BY_QUERY_ERROR",
    UPDATE_VACANCY_SUCCESS: "UPDATE_VACANCY_SUCCESS",
    UPDATE_VACANCY_ERROR: "UPDATE_VACANCY_ERROR",
    DELETE_VACANCY_SUCCESS: "DELETE_VACANCY_SUCCESS",
    CREATE_VACANCY_SUCCESS: "CREATE_VACANCY_SUCCESS",
    CREATE_VACANCY_ERROR: "CREATE_VACANCY_ERROR"
};

export const Actions = {
    GetAllVacancies: () => (dispatch) => {
        axios.defaults.headers.common['Cache-Control'] = "no-cache";
        axios.defaults.headers.get['Content-Type'] = "application/json";
        axios.defaults.headers.post['Content-Type'] = "application/json";
        axios.defaults.headers.put['Content-Type'] = "application/json";
        axios.defaults.headers.delete['Content-Type'] = "application/json";
        axios.defaults.baseURL = BASE_SERVER_URL;
        
        dispatch({
            type: ActionTypes.APP_INITIALIZED,
            payload: initialState
        });

        return axios.get("/vacancies").then(response => {
            return dispatch({
                type: ActionTypes.GET_VACANCIES_SUCCESS,
                payload: response.data,
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.GET_VACANCIES_ERROR,
                payload: error,
                error: true
            });
        });
    },

    GetAllCities: () => (dispatch) => {
        return axios.get("/cities").then(response => {
            return dispatch({
                type: ActionTypes.GET_CITIES_SUCCESS,
                payload: response.data,
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.GET_CITIES_ERROR,
                payload: error,
                error: true
            });
        });
    },

    Autocomplete: (request) => (dispatch) => {
        return axios.get("/cities", {params: request}).then(response => {
            return dispatch({
                type: ActionTypes.GET_CITIES_BY_QUERY_SUCCESS,
                payload: response.data,
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.GET_CITIES_BY_QUERY_ERROR,
                payload: error,
                error: true
            });
        });
    },

    CreateVacancy: (vacancy) => (dispatch) => {
        return axios.post("/vacancy", vacancy).then(response => {
            return dispatch({
                type: ActionTypes.CREATE_VACANCY_SUCCESS,
                payload: null
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.CREATE_VACANCY_ERROR,
                payload: error,
                error: true
            });
        });
    },
    
    UpdateVacancy: (id, vacancy) => (dispatch) => {
        return axios.put(`/vacancy/${id}`, vacancy).then(response => {
            return dispatch({
                type: ActionTypes.UPDATE_VACANCY_SUCCESS,
                payload: { id, vacancy }
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.UPDATE_VACANCY_ERROR,
                payload: error,
                error: true
            });
        });
    },

    DeleteVacancy: (id) => (dispatch) => {
        return axios.delete(`/vacancy/${id}`).then(response => {
            return dispatch({
                type: ActionTypes.DELETE_VACANCY_SUCCESS,
                payload: id
            });
        }).catch(error => {
            return dispatch({
                type: ActionTypes.DELETE_VACANCY_ERROR,
                payload: error,
                error: true
            });
        });
    }
};

export default createReducer(initialState, {
    [ActionTypes.APP_INITIALIZED]: (state, action) => {
        let initialState = action.payload;
        return { ...state, ...initialState, status: Status.INITIALIZING };
    },


    [ActionTypes.GET_VACANCIES_SUCCESS]: (state, action) => {

        return { ...state, vacancies: action.payload, status: Status.READY };
    },

    [ActionTypes.CREATE_VACANCY_SUCCESS]: (state, action) => {

        return { ...state, status: Status.READY };
    },

    [ActionTypes.GET_CITIES_SUCCESS]: (state, action) => {

        return { ...state, cities: action.payload, status: Status.READY };
    },

    [ActionTypes.GET_CITIES_BY_QUERY_SUCCESS]: (state, action) => {

        return { ...state, suggest: action.payload, status: Status.READY };
    },

    [ActionTypes.UPDATE_VACANCY_SUCCESS]: (state, action) => {
        let { id, vacancy } = action.payload;
        let filteredVacancies = state.vacancies.filter(x => x.id !== id);
        let vacancies = [vacancy].concat(filteredVacancies);

        return { ...state, vacancies: vacancies, status: Status.READY };
    },

    [ActionTypes.DELETE_VACANCY_SUCCESS]: (state, action) => {
        let id  = action.payload;
        let filteredVacancies = state.vacancies.filter(x => x.id !== id);

        return { ...state, vacancies: filteredVacancies, status: Status.READY };
    },

    [ActionTypes.GET_CITIES_ERROR]: (state, action) => {
        return { ...state, error: action.payload, status: Status.ERROR };
    },

    [ActionTypes.GET_VACANCIES_ERROR]: (state, action) => {
        return { ...state, error: action.payload, status: Status.ERROR };
    },
});