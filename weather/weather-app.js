var cities = ['Hanoi', 'Venice'];

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

function updateCities() {
    Promise.all(cities.map((cityName) => queryCityData(cityName)))
        .then((values) => {
            const cityList = {
                cities: values.map((value) => {
                    return {
                        data: value.location,
                        forecast: value.forecast,
                        time: new Date()
                    };
                }), 
                actions: {
                    addCity,
                    removeFirstCity,
                    removeLastCity,
                    removeCity,
                    refresh
                }
            };
            render(cityList);
        });
}

updateCities();

function addCity(cityName) {
    cities.push(cityName);
    updateCities();
}

function removeFirstCity() {
    //do your shit
    updateCities();
}

function removeLastCity() {
    cities.pop();
    updateCities();
}

function removeCity(cityName) {
    //do you shit here
    updateCities();
}

function clearAll() {
    //do you shit here
    updateCities();
}

function refresh() {
    updateCities();
}

