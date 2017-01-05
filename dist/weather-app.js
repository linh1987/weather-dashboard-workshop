'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var cities = ['Hanoi', 'Venice'];

function queryCityData(cityName) {
    return Promise.all([fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=41b32fae514addfcf8e801412ae4c88c').then(function (response) {
        return response.json();
    }), fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + '&appid=41b32fae514addfcf8e801412ae4c88c').then(function (response) {
        return response.json();
    })]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            location = _ref2[0],
            forecast = _ref2[1];

        return { location: location, forecast: forecast };
    });
}

Promise.all(cities.map(function (cityName) {
    return queryCityData(cityName);
})).then(function (values) {
    var cityList = {
        cities: values.map(function (value) {
            return {
                data: value.location,
                forecast: value.forecast,
                time: new Date()
            };
        })
    };
    render(cityList);
});