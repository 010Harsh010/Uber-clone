const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');
const captainModel = require("../models/caption.model.js");
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!address) {
        throw new Error("Address is required");
    }
    if (!apiKey) {
        throw new Error("Google Maps API key is required");
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            console.log(location.data);
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            console.error('Error response from Google API:', response.data);
            throw new Error(`Unable to fetch coordinates, status: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
        throw error;
    }    
}
module.exports.getDistanceAndTime = async (origin,destination) => {
    const apiKey = "AIzaSyD2IgP9cC8OhNo0xc9bvqeXfRibBd_4J3M";
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response  = await axios.get(url);
        if (response.data.status === 'OK') {
            // console.log("time data",response);
            if (response.data.status === 'OK') {

                if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                    throw new Error('No routes found');
                }
    
                return response.data.rows[ 0 ].elements[ 0 ];
            } else {
                throw new Error('Unable to fetch distance and time');
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.getPlaceSuggestion=async(input)=> {
    if (!input){
        throw new Error("Input is Require");
    }
    const apiKey = "AIzaSyD2IgP9cC8OhNo0xc9bvqeXfRibBd_4J3M";
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status==='OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch place suggestion');
        }
    } catch (error) {
        throw error;
    }
}
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // console.log(ltd,lng,radius);
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6378.1],
            },
        },
    });;
    return captains;
}