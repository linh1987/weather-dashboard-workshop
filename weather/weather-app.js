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

Promise.all(cities.map((cityName) => queryCityData(cityName)))
    .then((values) => {
        const cityList = {
            cities: values.map((value) => {
                return {
                    data: value.location,
                    forecast: value.forecast,
                    time: new Date()
                };
            })
        };
        render(cityList);
    });