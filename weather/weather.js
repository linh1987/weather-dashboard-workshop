
Vue.component('TimeComponent', {
    props: ['time'],
    template: `<div class="col-sm-12">
        <div class="temperature">
            <b>{{ time && time.getDay && time.getDay()}}</b>, {{time && time.toString && time.toString()}}
        </div>
    </div>`
})

Vue.component('WeatherIconComponent', {
    props: ['data'],
    template: `<div class='col-sm-4'>
        <div class='weather-icon'>
            <canvas height="84" width="84" id="clear-day" />
        </div>
    </div>)`,
});

Vue.component('WeatherText', {
    props: ['data'],
    template: `<div class='col-sm-8'>
        <div class="weather-text">
            <h2>
                {{data.name}} <br /> <i>{{data.weather[0].description}}</i>
            </h2>
        </div>
    </div>`
});

function convertFromKtoC(kTemp) {
    return kTemp - 273.15;
}


Vue.component('WeatherDegree', {
    props: ['data'],
    template: `<div class='weather-text pull-right'>
        <h3 class='degrees'>
            {{ CelsiusDegree }}
        </h3>
    </div>`,
    computed: {
        CelsiusDegree: function() {
            return convertFromKtoC(this.data.main.temp);
        }
    }
});

Vue.component('ForecastDay', {
    props: ['data'],
    template: `
        <div class="col-sm-2">
            <div class="daily-weather">
                <h2 class="day">Mon</h2>
                <h3 class="degrees">25</h3>
                <canvas id="clear-day" width="32" height="32"></canvas>
                <h5>15 <i>km/h</i></h5>
            </div>
        </div>
    `
});

Vue.component('Title', {
    template: `<div class='x_title'>
        <h2>
            Daily active users <small>Sessions</small>
        </h2>
        <ul class='nav navbar-right panel_toolbox'>
            <li>
                <a class="collapse-link"><i class="fa fa-chevron-up" /></a>
            </li>
            <li class="dropdown">
                <a href='index.html'
                    class='dropdown-toggle'
                    data-toggle='dropdown'
                    role='button'
                    area-expanded='false'>
                    <i class="fa fa-wrench" />
                </a>
                <ul class="dropdown-menu" role="menu">
                    <li>test</li>
                </ul>
            </li>
        </ul>
        <div class='clearfix' />
    </div>`
});

Vue.component('Body', {
    props: ['location', 'forecast', 'time'],
    template:`<div class='x_content'>
            <div class='row'>
                <TimeComponent v-bind:time="time" />
            </div>
            <div class='row'>
                <WeatherIconComponent v-bind:data="location" />
                <WeatherText v-bind:data="location" />
            </div>
            <div class='row'>
                <WeatherDegree v-bind:data="location" />
            </div>
            <div class='clearfix'>
            </div>
            <div class='row weather-days'>
                <ForecastDay v-for="dayData in forecast.list" v-bind:dayforecast="dayData" />
            </div>
        </div>`
})

Vue.component('WeatherWidget', {
    props: ['city'],
    template: `div class='col-md-6 col-sm-6 col-xs-12'>
        <div class='x_panel'>
            <Title />
            <Body v-bind:location="city.location" v-bind:time="city.time" v-bind:forecast="city.forecast" />
        </div>
    </div>`
})

Vue.component('WeatherWidgetList', {
    props: ['cities'],
    template: `
        <div>
            <WeatherWidget v-for="city in cities" v-bind:city="city"></WeatherWidget>
        </div>`
})


function queryCityData(cityName) {
    return Promise.all([
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=46d6aa5f80a6f0228fe86c56173d740d`)
            .then((response) => response.json()),
        fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=46d6aa5f80a6f0228fe86c56173d740d`)
            .then((response) => response.json())
    ]).then(([location, forecast]) => {
        return { location, forecast };
    });
}

queryCityData('Hanoi').then(({location, forecast}) => {
    var vueApp = new Vue({
        el: '#weather-widget',
        template: `
            <div>
                <WeatherWidgetList v-bind:cities="cities"></WeatherWidgetList>
            </div>`,
        data: {
            cities: [
                {
                    cityName: 'Hanoi',
                    location,
                    forecast,
                    time: new Date()
                }
            ]
        },
    })
})