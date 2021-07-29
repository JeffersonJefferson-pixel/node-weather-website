const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVmZmVyc29uamVmZmVyc29uLXBpeGVsIiwiYSI6ImNrcmlvN2xvczBpMjMydW1sdzFland3eGkifQ.syUs1YVnN2b7HLUukiv5pw&limit=1`;
    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else {
            const data = body;
            if (data.features.length === 0) {
                callback('Unable to find location! Try another search!', undefined);
            } else {
                callback(undefined, {
                    longitude: data.features[0].center[0],
                    latitude: data.features[0].center[1],
                    location: data.features[0].place_name,
                })
            }
        }
    })
};

module.exports = {
    geocode: geocode,
}