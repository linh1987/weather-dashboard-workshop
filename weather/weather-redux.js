const dummyTime = "2017-01-09T05:10:19.367Z";

function addCity(cityName) {
    return function (dispatch) {
        queryCityData(cityName).then(({location, forecast}) => {
            dispatch(createAddCityAction(cityName, location, forecast, dummyTime))
        })
    }
}

const addCityFunc = cityName => dispatch => {
    queryCityData(cityName).then(({location, forecast}) => {
        dispatch(createAddCityAction(cityName, location, forecast, dummyTime))
    })
}

// reducer
function weatherWidgetReducer(state = {
    cities: [
    ],
    lastCity: 'Rome',
    actions: {
        addCity: (cityName) => { weatherStore.dispatch(addCity(cityName)) },
        removeFirstCity: () => { weatherStore.dispatch(createRemoveFirstCityAction()) },
        removeLastCity: () => { weatherStore.dispatch(createRemoveLastCityAction()) },
        removeCity: (cityName) => { weatherStore.dispatch(createRemoveCityAction(cityName)) },
        updateLastCity: (cityName) => { weatherStore.dispatch(createUpdateLastCityAction(cityName)) }
    }
}, action) {
    const newState = state;

    switch (action.type) {
        case ADD_CITY:
            newState.cities.push({
                name: action.cityName,
                data: action.data,
                forecast: action.forecast,
                time: action.time
            });
            return newState;
        case UPDATE_LAST_CITY:
            newState.lastCity = action.cityName;
            return newState;
        case REMOVE_LAST_CITY:
            if (newState.cities.length > 0) {
                newState.cities.pop();
            }
            return newState;
        case REMOVE_CITY:
            newState.cities = newState.cities.filter(c => c.name !== action.cityName);
            return newState;
        case REMOVE_FIRST_CITY:
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

let thunk = window.ReduxThunk.default;

// store
let weatherStore = Redux.createStore(weatherWidgetReducer,
    Redux.applyMiddleware(thunk)
);

weatherStore.subscribe(() => {
    console.log(weatherStore.getState().lastCity)
    render(weatherStore.getState());
});

weatherStore.dispatch(addCity('Hanoi'));