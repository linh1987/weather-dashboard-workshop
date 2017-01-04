'use strict';

var e = Inferno.createElement;

var createVNode = Inferno.createVNode;
var Title = function Title(prop) {
    return createVNode(2, 'div', {
        'className': 'x_title'
    }, [createVNode(2, 'h2', null, ['Daily active users', createVNode(2, 'small', null, 'Sessions')]), createVNode(2, 'ul', {
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
    }, ['[1, 2, 3].map( => (', createVNode(2, 'li', null, '\'test\''), '));'])]), createVNode(2, 'li', null, createVNode(2, 'a', {
        'className': 'close-link'
    }, createVNode(2, 'i', {
        'className': 'fa fa-close'
    })))]), createVNode(2, 'div', {
        'className': 'clearfix'
    })]);
};

var WeatherWidgetToday = function WeatherWidgetToday(prop) {
    return createVNode(2, 'div', {
        'className': 'x_content'
    }, [createVNode(2, 'div', {
        'className': 'row'
    }, createVNode(2, 'div', {
        'className': 'col-sm-12'
    }, createVNode(2, 'div', {
        'className': 'temperature'
    }, 'Date()'))), createVNode(2, 'div', {
        'className': 'row'
    }, [createVNode(2, 'div', {
        'className': 'col-sm-4'
    }, createVNode(2, 'div', {
        'className': 'weather-icon'
    }, createVNode(2, 'canvas', {
        'height': '84',
        'width': '84',
        'id': 'partly-cloudy-day'
    }))), createVNode(2, 'div', {
        'className': 'col-sm-8'
    }, createVNode(2, 'div', {
        'className': 'weather-text'
    }, createVNode(2, 'h2', null, ['// data.name', createVNode(2, 'br'), createVNode(2, 'i', null, 'Partly Cloudy Day')]))), createVNode(2, 'div', {
        'className': 'col-sm-12'
    }, createVNode(2, 'div', {
        'className': 'weather-text pull-right'
    }, createVNode(2, 'h3', {
        'className': 'degrees'
    }, 'data.main.temp-280')))])]);
};

var body = function body(prop) {};

var data = '';
var WeatherWidget = function WeatherWidget(prop) {
    return createVNode(2, 'div', {
        'className': 'col-md-6 col-sm-6 col-xs-12'
    }, [createVNode(2, 'div', null, 'aaaaa'), createVNode(16, Title), createVNode(16, WeatherWidgetToday)]);
};

var render = function render() {
    Inferno.render(createVNode(16, WeatherWidget), document.getElementById("weather-widget"));
};

fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=hanoi&appid=41b32fae514addfcf8e801412ae4c88c').then(function (response) {
    return response.json();
}).then(function (response) {
    data = response;
    render();
});