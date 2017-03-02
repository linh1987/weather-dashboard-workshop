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

export function createRemoveLastCityAction() {
    return {
        type: actions.REMOVE_LAST_CITY
    }
}

export function createRemoveFirstCityAction() {
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