import { weatherStore, addCityFunc } from './weather-redux.js';
import { render } from './weather.js';

(function() {
    weatherStore.subscribe(() => {
        console.log(weatherStore.getState().lastCity)
        render(weatherStore.getState());
    });

    weatherStore.dispatch(addCityFunc('Hanoi'));
    console.log('asd');
})();