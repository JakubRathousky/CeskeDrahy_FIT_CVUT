import data from '../data/connections.json';
import { getStationById } from './stations'

export function getConnections(from, to) {
    let fromStation = getStationById(from);
    let toStation = getStationById(to);

    return data.filter(x => x.start === fromStation.name && x.cil === toStation.name);
}
