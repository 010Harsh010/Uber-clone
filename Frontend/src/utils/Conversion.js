export function convertDistance(distance) {
    return parseFloat((distance / 1000).toFixed(2));  // Converts to float
}
export function convertTime(second){
    return parseFloat((second/3600).toFixed(2));
}