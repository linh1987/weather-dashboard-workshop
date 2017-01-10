
// ACTION TYPES
const ADD_CITY = "ADD_CITY";
const UPDATE_CITY = "UPDATE_CITY";
const REMOVE_LAST_CITY = "REMOVE_LAST_CITY";

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

function createRemoveLastCityAction() {
    return {
        type: REMOVE_LAST_CITY
    }
}