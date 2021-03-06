const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e0d3ce1508bbc72c835d6c802f402265&query=${latitude},${longitude}&units=f`;
    request({ url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const data = body;
            const description = data.current.weather_descriptions[0];
            const temperature = data.current.temperature;
            const feelslike = data.current.feelslike;
            const humidity = data.current.humidity;
            callback(undefined, `It is ${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`);
        }
    })
}

module.exports = {
    forecast: forecast,
}