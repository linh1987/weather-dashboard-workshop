const ADD_CITY = "ADD_CITY";
const REMOVE_LAST_CITY = "REMOVE_LAST_CITY";

const weatherWidgetState = {
    cities: [
    ],
    actions: {
        addCity: () => { },
        removeFirstCity: () => { },
        removeLastCity: () => { },
        removeCity: () => { },
        refresh: () => { }
    }
}

function createAddCityAction(cityName) {
    return {
        type: ADD_CITY,
        cityName: cityName
    };
}

function createRemoveLastCityAction() {
    return {
        type: REMOVE_LAST_CITY
    }
}


function weatherWidgetReducer(state = {
    cities: [
    ],
    actions: {
        addCity: () => { },
        removeFirstCity: () => { },
        removeLastCity: () => { },
        removeCity: () => { },
        refresh: () => { }
    }
}, action) {
    const newState = state;
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


let weatherStore = Redux.createStore(weatherWidgetReducer);

weatherStore.subscribe(() =>
  console.log(JSON.stringify(weatherStore.getState()))
)

weatherStore.dispatch(createAddCityAction('Hanoi'))

weatherStore.dispatch(createAddCityAction('Venice'))

weatherStore.dispatch(createAddCityAction('Rome'))

weatherStore.dispatch(createRemoveLastCityAction())
