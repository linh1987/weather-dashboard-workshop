
var e = Inferno.createElement;

var title = function (prop) {
    return e('div', { className: "x_panel" },
        e('div', { className: 'x_title' },
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
                e('div', { className: 'clearfix' })
            ]
        )
    );
};

var body = function(prop) {
    
}

var data = '';
var weatherWidget = function (prop) {
    return e('div', { className: 'col-md-6 col-sm-6 col-xs-12' },
        [
            e(title),
            e('div', {}, data.weather[0].description)
        ]
    );
};


var render = function () {
    Inferno.render(e(weatherWidget),
        document.getElementById("weather-widget"));
};

fetch('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=41b32fae514addfcf8e801412ae4c88c')
    .then(function (response) {
        return response.json();
    }).then(function (response) {
        data = response;
        render();
    });
