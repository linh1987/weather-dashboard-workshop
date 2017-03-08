
import {weatherStore, addCityFunc} from './weather-redux.js'
import {render} from './weather.js';

weatherStore.subscribe(() => {
    render(weatherStore.getState());
});

weatherStore.dispatch(addCityFunc('Hanoi'));
