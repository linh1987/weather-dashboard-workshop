
// action creators
function createAddCityAction(cityName, data, forecast, time) {
    return {
        type: ADD_CITY,
        cityName: cityName,
        data, 
        forecast, 
        time,
    };
}

function createUpdateLastCityAction(cityName) {
    return {
        type: UPDATE_LAST_CITY, 
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

function createRemoveLastCityAction() {
    return {
        type: REMOVE_LAST_CITY
    }
}

function createRemoveFirstCityAction() {
    return {
        type: REMOVE_FIRST_CITY
    }
}

function createRemoveCityAction(cityName) {
    return {
        type: REMOVE_CITY,
        cityName: cityName
    }
}