
var e = Inferno.createElement;

var Title = function (prop) {
    return (
        <div className = 'x_title' >

            <h2>Daily active users
                <small>Sessions</small>
            </h2>
            <ul className = "nav navbar-right panel_toolbox" >
                    
                <li>
                    <a className= 'collapse-link' >
                        <i className= 'fa fa-chevron-up' ></i>
                    </a>
                </li>
                <li className= 'dropdown' >
                            
                        <a
                            href= 'index.html'
                            className= 'dropdown-toggle'
                            data-toggle= 'dropdown'
                            role= 'button'
                            area-expanded= 'false'
                        >
                            <i className= 'fa fa-wrench' ></i>
                        </a>
                        <ul className= "dropdown-menu" role= 'menu' >
                            [1, 2, 3].map( => (<li>'test'</li>));
                        </ul>
                    </li>
                <li>
                    <a className= 'close-link' > 
                        <i className= 'fa fa-close' ></i>
                    </a>
                </li>
            </ul>
            <div className= 'clearfix' ></div>
        </div>
    )
};

var WeatherWidgetToday = function(prop) {
    return (
        <div className= 'x_content'> 
            <div className='row' > 
                <div className='col-sm-12' > 
                    <div className= 'temperature' >Date()</div>
                </div>
            </div>
            <div className= 'row' >
                <div className='col-sm-4'>
                    <div className='weather-icon'> 
                        <canvas height= '84' width= '84' id= 'partly-cloudy-day'></canvas>
                    </div>
                </div>
                <div className='col-sm-8'>
                    <div className='weather-text'> 
                        <h2> 
                            // data.name
                            <br/>
                            <i>Partly Cloudy Day</i>
                        </h2>
                    </div>
                </div>
                <div className='col-sm-12' >   
                    <div className= 'weather-text pull-right'> 
                        <h3 className= 'degrees'>data.main.temp-280</h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

var body = function(prop) {
    
}

var data = '';
var WeatherWidget = function (prop) {
    return (
        <div className = 'col-md-6 col-sm-6 col-xs-12'> 
            <div>aaaaa</div>
            <Title />
            <WeatherWidgetToday />
        </div>
    )
    
    
    
};


var render = function () {
    Inferno.render((<WeatherWidget />), document.getElementById("weather-widget"));
};

fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=hanoi&appid=41b32fae514addfcf8e801412ae4c88c')
    .then(function (response) {
        return response.json();
    }).then(function (response) {
        data = response;
        render();
    });
