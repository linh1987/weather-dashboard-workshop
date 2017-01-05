var Title = function (prop) {
    return (<div className='x_title'>
        <h2>
            Daily active users <small>Sessions</small>
        </h2>
        <ul className='nav navbar-right panel_toolbox'>
            <li>
                <a className="collapse-link"><i className="fa fa-chevron-up" /></a>
            </li>
            <li className="dropdown">
                <a href='index.html'
                    className='dropdown-toggle'
                    data-toggle='dropdown'
                    role='button'
                    area-expanded='false'>
                    <i className="fa fa-wrench" />
                </a>
                <ul className="dropdown-menu" role="menu">
                    {
                        [1, 2, 3].map(() => <li>test</li>)
                    }
                </ul>
            </li>
        </ul>
        <div className='clearfix' />
    </div>);
};

var TimeComponent = function (prop) {
    return (<div className="col-sm-12">
        <div className="temperature">
            <b>{prop.time && prop.time.getDay && prop.time.getDay()}</b>,{prop.time && prop.time.toString && prop.time.toString()}
        </div>
    </div>);
}

var getWeatherId = function (weather) {
    if (weather === 'clear sky')
        return 'clear-day';
    return weather.replace(' ', '-');
}

var WeatherIconComponent = function (prop) {
    return (<div className='col-sm-4'>
        <div className='weather-icon'>
            <canvas height="84" width="84" id={getWeatherId(prop.data.weather[0].description)} />
        </div>
    </div>);
}

var WeatherText = function (prop) {
    return (<div className='col-sm-8'>
        <div className="weather-text">
            <h2>
                {prop.data.name} <br /> <i>{prop.data.weather[0].description}</i>
            </h2>
        </div>
    </div>);
}

function convertFromKtoC(kTemp) {
    return kTemp - 273.15;
}


var WeatherDegree = function ({data}) {
    return (<div className='weather-text pull-right'>
        <h3 className='degrees'>
            {convertFromKtoC(data.main.temp)}
        </h3>
    </div>
    );
}

var ForecastDay = ({dayforecast}) => {
    return (
        <div class="col-sm-2">
            <div class="daily-weather">
                <h2 class="day">Mon</h2>
                <h3 class="degrees">25</h3>
                <canvas id="clear-day" width="32" height="32"></canvas>
                <h5>15 <i>km/h</i></h5>
            </div>
        </div>
    )
}


var Body = (props) => {
    return (
        <div className='x_content'>
            <div className='row'>
                <TimeComponent time={props.time} />
            </div>
            <div className='row'>
                <WeatherIconComponent data={props.data} />
                <WeatherText data={props.data} />
            </div>
            <div className='row'>
                <WeatherDegree data={props.data} />
            </div>
            <div className='clearfix'>
            </div>
            <div className='row weather-days'>
                {
                    props.forecast.list.map((dayData) => (<ForecastDay dayforecast={dayData} />))
                }
            </div>
        </div>
    );
}



var WeatherWidget = (props) => {
    return (<div className='col-md-6 col-sm-6 col-xs-12'>
        <div className='x_panel'>
            <Title />
            <Body data={props.data} time={props.time} forecast={props.forecast} />
        </div>
    </div>);
};


var render = (data, time, forecast) => {
    Inferno.render(<WeatherWidget data={data} time={time} forecast={forecast} />,
        document.getElementById('weather-widget')
    );
};

Promise.all([
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=41b32fae514addfcf8e801412ae4c88c').then((response) => response.json()),
    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=hanoi&appid=41b32fae514addfcf8e801412ae4c88c').then((response) => response.json())
]).then(([location, forecast]) => { return { location, forecast }; })
    .then(function (response) {
        const data = response.location;
        const forecast = response.forecast;
        const time = new Date();
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
