import * as actions from './weather-actions.js';

// action creators
export function createAddCityAction(cityName, data, forecast, time) {
    return {
        type: actions.ADD_CITY,
        cityName: cityName,
        data, 
        forecast, 
        time,
    };
}

export function createUpdateLastCityAction(cityName) {
    return {
        type: actions.UPDATE_LAST_CITY, 
        cityName
    }
}

// function createUpdateCityDataAction(cityName, data, forecast, time) {
//     return {
//         type: UPDATE_CITY_DATA,
//         cityName: cityName,
//         data, 
//         forecast, 
//         time,
//     };
// }

export function createRemoveLastCityAction() {
    return {
        type: actions.REMOVE_LAST_CITY
    }
}

function createRemoveFirstCityAction() {
    return {
        type: actions.REMOVE_FIRST_CITY
    }
}

export function createRemoveCityAction(cityName) {
    return {
        type: actions.REMOVE_CITY,
        cityName: cityName
    }
}

export function createShowclockAction() {
    return {
        type: actions.SHOW_CLOCK
    }
}