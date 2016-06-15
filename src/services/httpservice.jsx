
var Fetch = require('whatwg-fetch');

var service = {

	get(city) {
		return fetch('http://api.openweathermap.org/data/2.5/forecast/city?q=' + city + '&APPID=e09581cfda14c3ac23a563e2e5adf3b6')
			.then(function(response) {
				return response.json();
			});
	}

};

module.exports = service;