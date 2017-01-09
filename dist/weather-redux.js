"use strict";

var ADD_CITY = "ADD_CITY";
var REMOVE_LAST_CITY = "REMOVE_LAST_CITY";

var weatherWidgetState = {
    cities: [],
    actions: {
        addCity: function addCity() {},
        removeFirstCity: function removeFirstCity() {},
        removeLastCity: function removeLastCity() {},
        removeCity: function removeCity() {},
        refresh: function refresh() {}
    }
};

function createAddCityAction(cityName) {
    return {
        type: ADD_CITY,
        cityName: cityName
    };
}

function createRemoveLastCityAction() {
    return {
        type: REMOVE_LAST_CITY
    };
}

function weatherWidgetReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        cities: [],
        actions: {
            addCity: function addCity() {},
            removeFirstCity: function removeFirstCity() {},
            removeLastCity: function removeLastCity() {},
            removeCity: function removeCity() {},
            refresh: function refresh() {}
        }
    };
    var action = arguments[1];

    var newState = state;
    switch (action.type) {
        case ADD_CITY:
            newState.cities.push({ name: action.cityName });
            return newState;
        case REMOVE_LAST_CITY:
            if (newState.cities.length > 0) {
                newState.cities.pop();
            }
            return newState;
        default:
            return state;
    }
}

var weatherStore = Redux.createStore(weatherWidgetReducer);

weatherStore.subscribe(function () {
    return console.log(JSON.stringify(weatherStore.getState()));
});

weatherStore.dispatch(createAddCityAction('Hanoi'));

weatherStore.dispatch(createAddCityAction('Venice'));

weatherStore.dispatch(createAddCityAction('Rome'));

weatherStore.dispatch(createRemoveLastCityAction());