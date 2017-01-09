'use strict';

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
var WeatherWidgetToolbar = function WeatherWidgetToolbar(_ref3) {
    var actions = _ref3.actions;

    return createVNode(2, 'div', {
        'className': 'row'
    }, createVNode(2, 'div', {
        'className': 'col-xs-12'
    }, [createVNode(2, 'label', null, 'City Name'), createVNode(512, 'input', {
        'type': 'text'
    }), createVNode(2, 'button', null, 'Add City'), createVNode(2, 'button', null, 'Remove City'), createVNode(2, 'button', null, 'Remove Last City', {
        'onClick': actions.removeLastCity
    }), createVNode(2, 'button', null, 'Refresh')]));
};
var WeatherWidgetList = function WeatherWidgetList(_ref4) {
    var cities = _ref4.cities,
        actions = _ref4.actions;

    return createVNode(2, 'div', null, [createVNode(16, WeatherWidgetToolbar, {
        'actions': actions
    }), cities.map(function (city) {
        return createVNode(16, WeatherWidget, {
            'data': city.data,
            'time': city.time,
            'forecast': city.forecast
        });
    })]);
};

var render = function render(weatherData) {
    Inferno.render(createVNode(16, WeatherWidgetList, {
        'actions': weatherData.actions,
        'cities': weatherData.cities
    }), document.getElementById('weather-widget'));
};