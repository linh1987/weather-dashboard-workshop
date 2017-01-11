
// ACTION TYPES
const ADD_CITY = "ADD_CITY";
const UPDATE_CITY = "UPDATE_CITY";
const REMOVE_LAST_CITY = "REMOVE_LAST_CITY";
const REMOVE_FIRST_CITY = "REMOVE_FIRST_CITY";
const UPDATE_LAST_CITY = "UPDATE_LAST_CITY";
const ADD_EMPTY_CITY = "ADD_EMPTY_CITY";

// action creators
function createAddCityAction(cityName, data, forecast, time) {
    return {
        type: ADD_CITY,
        name: cityName,
        data,
        forecast,
        time
    };
}

function updateCityAction(cityName, data, forecast, time) {
    return {
        type: UPDATE_CITY,
        name: cityName,
        data,
        forecast,
        time
    };
}

function createRemoveFirstCityAction() {
    return {
        type: REMOVE_FIRST_CITY
    }
}

function createRemoveLastCityAction() {
    return {
        type: REMOVE_LAST_CITY
    }
}

function createUpdateLastCity(cityName) {
    return {
        type: UPDATE_LAST_CITY,
        cityName: cityName
    };
}

function createAddEmptyCity() {
    return {
        type: ADD_EMPTY_CITY
    };
}