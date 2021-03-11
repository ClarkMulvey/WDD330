import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

let baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

let locationJSON;

const quakeList = document.querySelector('#quakeList');

const quakeController = new QuakesController('#quakeList');
quakeController.init();

const location = getLocation().then(function(result) {
    baseUrl += `&latitude=${result.coords.latitude}`;
    baseUrl += `&longitude=${result.coords.longitude}`;
    baseUrl += `&maxradiuskm=100`;

    console.log("completed URl:");
    console.log(baseUrl);

    locationJSON = getJSON(baseUrl);
    console.log(locationJSON);
});

