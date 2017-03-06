import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import * as actionCreators from './weather-action-creators.js';
import * as actions from './weather-actions.js';

const dummyTime = "2017-01-09T05:10:19.367Z";

export const addCityFunc = cityName => dispatch => {
    queryCityData(cityName).then(({location, forecast}) => {
        dispatch(actionCreators.createAddCityAction(cityName, location, forecast, dummyTime))
    })
}

// reducer
function weatherWidgetReducer(state = {
    cities: [
    ],
    lastCity: 'Rome',
    actions: {
        addCity: (cityName) => { weatherStore.dispatch(addCityFunc(cityName)) },
        removeFirstCity: () => { weatherStore.dispatch(actionCreators.createRemoveFirstCityAction()) },
        removeLastCity: () => { weatherStore.dispatch(actionCreators.createRemoveLastCityAction()) },
        removeCity: (cityName) => { weatherStore.dispatch(actionCreators.createRemoveCityAction(cityName)) },
        updateLastCity: (cityName) => { weatherStore.dispatch(actionCreators.createUpdateLastCityAction(cityName)) }
    }
}, action) {
    const newState = state;

    switch (action.type) {
        case actions.ADD_CITY:
            newState.cities.push({
                name: action.cityName,
                data: action.data,
                forecast: action.forecast,
                time: action.time
            });
            return newState;
        case actions.UPDATE_LAST_CITY:
            newState.lastCity = action.cityName;
            return newState;
        case actions.REMOVE_LAST_CITY:
            if (newState.cities.length > 0) {
                newState.cities.pop();
            }
            return newState;
        case actions.REMOVE_CITY:
            newState.cities = newState.cities.filter(c => c.name !== action.cityName);
            return newState;
        case actions.REMOVE_FIRST_CITY:
            if (newState.cities.length > 0) {
                newState.cities.shift();
            }
            return newState;
        default:
            return state;
    }
}


function queryCityData(cityName) {
    return Promise.all([
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=46d6aa5f80a6f0228fe86c56173d740d`)
            .then((response) => response.json()),
        fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=46d6aa5f80a6f0228fe86c56173d740d`)
            .then((response) => response.json())
    ]).then(([location, forecast]) => {
        return { location, forecast };
    });
}


// store
export let weatherStore = createStore(weatherWidgetReducer,
    applyMiddleware(ReduxThunk)
);
