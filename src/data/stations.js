import data from '../data/stations.json';

export function getStations() {
    return data;
} 
export function getStationNames() {
    return data.map(x => x.name);
}
export function getStationIds() {
    return data.map(x => x.id);
}
export function getStationById(id) {
    let station = data.find(x => x.id === id);
    return station;
}
export function getStationByName(name) {
    let station = data.find(x => x.name === name);
    return station;
}