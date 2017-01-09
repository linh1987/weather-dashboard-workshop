const dummyData = {
    "coord": { "lon": 105.85, "lat": 21.03 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "base": "stations", "main": { "temp": 296.173, "pressure": 1017.62, "humidity": 86, "temp_min": 296.173, "temp_max": 296.173, "sea_level": 1025.89, "grnd_level": 1017.62 }, "wind": { "speed": 3.23, "deg": 142.504 }, "rain": { "3h": 0.175 }, "clouds": { "all": 88 }, "dt": 1483938377, "sys": { "message": 0.0062, "country": "VN", "sunrise": 1483918539, "sunset": 1483957920 }, "id": 1561096, "name": "Xóm Pho", "cod": 200
};
const dummyForeCast = {
    "city": { "id": 1561096, "name": "Xóm Pho", "coord": { "lon": 105.849998, "lat": 21.033331 }, "country": "VN", "population": 0 }, "cod": "200", "message": 0.0235, "cnt": 7, "list": [{ "dt": 1483938000, "temp": { "day": 301.8, "min": 293.08, "max": 301.8, "night": 293.08, "eve": 295.78, "morn": 298.85 }, "pressure": 1022.97, "humidity": 70, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "speed": 3.68, "deg": 130, "clouds": 64 }, { "dt": 1484024400, "temp": { "day": 295.14, "min": 293.18, "max": 295.14, "night": 293.81, "eve": 293.57, "morn": 293.18 }, "pressure": 1024.13, "humidity": 92, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "speed": 5.56, "deg": 114, "clouds": 92, "rain": 3.5 }, { "dt": 1484110800, "temp": { "day": 294.76, "min": 288.08, "max": 294.92, "night": 288.08, "eve": 290.81, "morn": 293.8 }, "pressure": 1022.36, "humidity": 100, "weather": [{ "id": 502, "main": "Rain", "description": "heavy intensity rain", "icon": "10d" }], "speed": 5.11, "deg": 111, "clouds": 92, "rain": 27.23 }, { "dt": 1484197200, "temp": { "day": 288.14, "min": 286.18, "max": 288.14, "night": 286.18, "eve": 287.44, "morn": 287.44 }, "pressure": 1017.53, "humidity": 0, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 4.96, "deg": 20, "clouds": 97, "rain": 2.32 }, { "dt": 1484283600, "temp": { "day": 289.26, "min": 285.28, "max": 289.26, "night": 286.71, "eve": 288.27, "morn": 285.28 }, "pressure": 1018.71, "humidity": 0, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 4.85, "deg": 23, "clouds": 88, "rain": 1.01 }, { "dt": 1484370000, "temp": { "day": 290.1, "min": 285.79, "max": 290.1, "night": 287.18, "eve": 288.94, "morn": 285.79 }, "pressure": 1019.82, "humidity": 0, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 4.41, "deg": 15, "clouds": 78, "rain": 0.82 }, { "dt": 1484456400, "temp": { "day": 288.16, "min": 285.3, "max": 288.16, "night": 285.3, "eve": 286.9, "morn": 286.08 }, "pressure": 1022.46, "humidity": 0, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 4.57, "deg": 20, "clouds": 99, "rain": 0.88 }]
};

const dummyTime = "2017-01-09T05:10:19.367Z";


// ACTION TYPES
const ADD_CITY = "ADD_CITY";
const REMOVE_LAST_CITY = "REMOVE_LAST_CITY";

// action creators
function createAddCityAction(cityName, data, forecast, time) {
    return {
        type: ADD_CITY,
        cityName: cityName,
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

// reducer
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
            newState.cities.push({ 
                name: action.cityName, 
                data: action.data, 
                forecast: action.forecast, 
                time: action.time 
            });
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

// store
let weatherStore = Redux.createStore(weatherWidgetReducer);

weatherStore.subscribe(() => {
        console.log(JSON.stringify(weatherStore.getState()));
        render(weatherStore.getState());
    }
)

weatherStore.dispatch(createAddCityAction('Hanoi', dummyData, dummyForeCast, dummyTime))

weatherStore.dispatch(createAddCityAction('Venice', dummyData, dummyForeCast, dummyTime))

weatherStore.dispatch(createAddCityAction('Rome', dummyData, dummyForeCast, dummyTime))

weatherStore.dispatch(createRemoveLastCityAction())
