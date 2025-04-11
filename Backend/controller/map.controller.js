const mapService = require("../services/map.service.js");
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}
module.exports.getDistanceTime = async(req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json ({errors: error.array()});
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapService.getDistanceAndTime(origin, destination);
        console.log(distanceTime);
        res.status(200).json(distanceTime);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}
module.exports.suggestion = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {input} = req.query;
    try {
        const suggestion = await mapService.getPlaceSuggestion(input);
        res.status(200).json(suggestion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}
