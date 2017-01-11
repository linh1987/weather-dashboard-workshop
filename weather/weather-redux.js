const dummyTime = "2017-01-09T05:10:19.367Z";

function addCityConnector() {
    weatherStore.dispatch(createAddCityAction('Rome'));
}

function removeLastCityConnector() {
    weatherStore.dispatch(createRemoveLastCityAction());
}

// reducer
function weatherWidgetReducer(state = {
    cities: [
    ],
    actions: {
        addCity: addCityConnector.bind(this),
        removeFirstCity: () => { },
        removeLastCity: removeLastCityConnector.bind(this),
        removeCity: () => { },
        refresh: () => { }
    }
}, action) {
    const newState = state;
    
    switch (action.type) {
        case ADD_CITY:
            newState.cities.push({
                name: action.cityName,
            });
            return newState;
        case UPDATE_CITY_DATA:
            if (newState.cities.some((city) => city.name === action.cityName)) {
                const cityToUpdate = newState.cities.find(c => c.name === action.cityName);

                cityToUpdate.data = action.data;
                cityToUpdate.forecast = action.forecast;
                cityToUpdate.time = action.time;
            }
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
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=41b32fae514addfcf8e801412ae4c88c`)
            .then((response) => response.json()),
        fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=41b32fae514addfcf8e801412ae4c88c`)
            .then((response) => response.json())
    ]).then(([location, forecast]) => {
        return { location, forecast };
    });
}

// store
let weatherStore = Redux.createStore(weatherWidgetReducer);

weatherStore.subscribe(() => {
    render(weatherStore.getState());
});


weatherStore.subscribe(() => {
    const currentState = weatherStore.getState();
    console.log('Changes detected!');
    currentState.cities.forEach((city) => {
        if (!city.data) {
            console.log('querying data for :' + city.name);
            queryCityData(city.name).then(({location, forecast}) => {
                console.log('updating data for:' + city.name);
                weatherStore.dispatch(createUpdateCityDataAction(city.name, location, forecast, dummyTime))
            })
        }
    });
})

weatherStore.dispatch(createAddCityAction('Hanoi'))
