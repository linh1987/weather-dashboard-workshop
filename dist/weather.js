'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var createVNode = Inferno.createVNode;
var Title = function Title(prop) {
    return createVNode(2, 'div', {
        'className': 'x_title'
    }, [createVNode(2, 'h2', null, ['Daily active users ', createVNode(2, 'small', null, 'Sessions')]), createVNode(2, 'ul', {
        'className': 'nav navbar-right panel_toolbox'
    }, [createVNode(2, 'li', null, createVNode(2, 'a', {
        'className': 'collapse-link'
    }, createVNode(2, 'i', {
        'className': 'fa fa-chevron-up'
    }))), createVNode(2, 'li', {
        'className': 'dropdown'
    }, [createVNode(2, 'a', {
        'href': 'index.html',
        'className': 'dropdown-toggle',
        'data-toggle': 'dropdown',
        'role': 'button',
        'area-expanded': 'false'
    }, createVNode(2, 'i', {
        'className': 'fa fa-wrench'
    })), createVNode(2, 'ul', {
        'className': 'dropdown-menu',
        'role': 'menu'
    }, [1, 2, 3].map(function () {
        return createVNode(2, 'li', null, 'test');
    }))])]), createVNode(2, 'div', {
        'className': 'clearfix'
    })]);
};

var TimeComponent = function TimeComponent(prop) {
    return createVNode(2, 'div', {
        'className': 'col-sm-12'
    }, createVNode(2, 'div', {
        'className': 'temperature'
    }, [createVNode(2, 'b', null, prop.time && prop.time.getDay && prop.time.getDay()), ',', prop.time && prop.time.toString && prop.time.toString()]));
};

var getWeatherId = function getWeatherId(weather) {
    if (weather === 'clear sky') return 'clear-day';
    return weather.replace(' ', '-');
};

var WeatherIconComponent = function WeatherIconComponent(prop) {
    return createVNode(2, 'div', {
        'className': 'col-sm-4'
    }, createVNode(2, 'div', {
        'className': 'weather-icon'
    }, createVNode(2, 'canvas', {
        'height': '84',
        'width': '84',
        'id': getWeatherId(prop.data.weather[0].description)
    })));
};

var WeatherText = function WeatherText(prop) {
    return createVNode(2, 'div', {
        'className': 'col-sm-8'
    }, createVNode(2, 'div', {
        'className': 'weather-text'
    }, createVNode(2, 'h2', null, [prop.data.name, ' ', createVNode(2, 'br'), ' ', createVNode(2, 'i', null, prop.data.weather[0].description)])));
};

function convertFromKtoC(kTemp) {
    return kTemp - 273.15;
}

var WeatherDegree = function WeatherDegree(_ref) {
    var data = _ref.data;

    return createVNode(2, 'div', {
        'className': 'weather-text pull-right'
    }, createVNode(2, 'h3', {
        'className': 'degrees'
    }, convertFromKtoC(data.main.temp)));
};

var ForecastDay = function ForecastDay(_ref2) {
    var dayforecast = _ref2.dayforecast;

    return createVNode(2, 'div', {
        'class': 'col-sm-2'
    }, createVNode(2, 'div', {
        'class': 'daily-weather'
    }, [createVNode(2, 'h2', {
        'class': 'day'
    }, 'Mon'), createVNode(2, 'h3', {
        'class': 'degrees'
    }, '25'), createVNode(2, 'canvas', {
        'id': 'clear-day',
        'width': '32',
        'height': '32'
    }), createVNode(2, 'h5', null, ['15 ', createVNode(2, 'i', null, 'km/h')])]));
};

var Body = function Body(props) {
    return createVNode(2, 'div', {
        'className': 'x_content'
    }, [createVNode(2, 'div', {
        'className': 'row'
    }, createVNode(16, TimeComponent, {
        'time': props.time
    })), createVNode(2, 'div', {
        'className': 'row'
    }, [createVNode(16, WeatherIconComponent, {
        'data': props.data
    }), createVNode(16, WeatherText, {
        'data': props.data
    })]), createVNode(2, 'div', {
        'className': 'row'
    }, createVNode(16, WeatherDegree, {
        'data': props.data
    })), createVNode(2, 'div', {
        'className': 'clearfix'
    }), createVNode(2, 'div', {
        'className': 'row weather-days'
    }, props.forecast.list.map(function (dayData) {
        return createVNode(16, ForecastDay, {
            'dayforecast': dayData
        });
    }))]);
};

var WeatherWidget = function WeatherWidget(props) {
    return createVNode(2, 'div', {
        'className': 'col-md-6 col-sm-6 col-xs-12'
    }, createVNode(2, 'div', {
        'className': 'x_panel'
    }, [createVNode(16, Title), createVNode(16, Body, {
        'data': props.data,
        'time': props.time,
        'forecast': props.forecast
    })]));
};

var render = function render(data, time, forecast) {
    Inferno.render(createVNode(16, WeatherWidget, {
        'data': data,
        'time': time,
        'forecast': forecast
    }), document.getElementById('weather-widget'));
};

Promise.all([fetch('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=41b32fae514addfcf8e801412ae4c88c').then(function (response) {
    return response.json();
}), fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=hanoi&appid=41b32fae514addfcf8e801412ae4c88c').then(function (response) {
    return response.json();
})]).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        location = _ref4[0],
        forecast = _ref4[1];

    return { location: location, forecast: forecast };
}).then(function (response) {
    var data = response.location;
    var forecast = response.forecast;
    var time = new Date();
    console.log(response);
    render(data, time, forecast);
    //renderSkycons();
});

// fetch('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=41b32fae514addfcf8e801412ae4c88c')
//     .then(function (response) {
//         return response.json();
//     }).then(function (response) {
//         const data = response;
//         const time = new Date();
//         render(data, time);
//         renderSkycons();
//     });