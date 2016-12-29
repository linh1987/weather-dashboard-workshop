
var e = Inferno.createElement;

var title = function (prop) {
    return div({ className: "x_panel" },
        div({ className: 'x_title' },
            [
                e('h2', {}, 'Daily active users',
                    e('small', {}, 'Sessions')
                ),
                e('ul', { className: "nav navbar-right panel_toolbox" },
                    [
                        e('li', {},
                            e('a', { className: 'collapse-link' },
                                e('i', { className: 'fa fa-chevron-up' })
                            )
                        ),
                        e('li', { className: 'dropdown' },
                            [
                                e('a', {
                                    href: 'index.html',
                                    className: 'dropdown-toggle',
                                    'data-toggle': 'dropdown',
                                    role: 'button',
                                    'area-expanded': 'false'
                                },
                                    e('i', { className: 'fa fa-wrench' })
                                ),
                                e('ul', { className: "dropdown-menu", role: 'menu' },
                                    [1, 2, 3].map(function () {
                                        return e('li', {}, 'test');
                                    })
                                ),
                            ]
                        ),
                    ]
                ),
                div({ className: 'clearfix' })
            ]
        )
    );
};

var timeComponent = function (prop) {
    return div({ className: 'col-sm-12' }, [
        div({ className: 'temperature' }, [
            e('b', {}, time && time.getDay && time.getDay()),
            ", " + (time && time.toString && time.toString())
        ]),
    ]);
}

var getWeatherId = function (weather) {
    if (weather === 'clear sky')
        return 'clear-day';
    return weather.replace(' ', '-');
}

var weatherIconComponent = function (prop) {
    return div({ className: 'col-sm-4' }, [
        div({ className: 'weather-icon' }, [
            e('canvas', { height: 84, width: 84, id: getWeatherId(data.weather[0].description) })
        ])
    ]);
}

var weatherText = function (prop) {
    return div({ className: 'col-sm-8' }, [
        div({ className: 'weather-text' }, [
            h2({}, [
                data.name,
                e('br'),
                e('i', {}, (data.weather[0].description))
            ])
        ])
    ]);
}

function convertFromKtoC(kTemp) {
    return kTemp - 273.15;
}

var div = function (prop, children) {
    return e('div', prop, children);
}

var h2 = function (prop, children) {
    return e('h2', prop, children);
}

var h3 = function (prop, children) {
    return e('h3', prop, children);
}

var weatherDegree = function (prop) {
    return div({className: 'weather-text pull-right'}, [
        h3({className: "degrees"}, 
            convertFromKtoC(data.main.temp)
        )
    ]);
}

var body = function (prop) {
    return e('div', { className: 'x_content' }, [
        div({ className: "row" }, [
            e(timeComponent),
        ]),
        div({ className: "row" }, [
            e(weatherIconComponent),
            e(weatherText)
        ]),
        div({ className: "row" }, [
            e(weatherDegree),
        ]),
    ]
    );
}

var data = '';
var time = {};
var weatherWidget = function (prop) {
    return div({ className: 'col-md-6 col-sm-6 col-xs-12' },
        [
            e(title),
            e(body),
        ]
    );
};


var render = function () {
    Inferno.render(e(weatherWidget),
        document.getElementById("weather-widget"));
};

fetch('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=41b32fae514addfcf8e801412ae4c88c')
    .then(function (response) {
        return response.json();
    }).then(function (response) {
        data = response;
        time = new Date();
        render();
        renderSkycons();
    });
