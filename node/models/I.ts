export interface IAirport {
    city: string,
    code: string,
    desc: string,
    elev: number,
    icao: string,
    lat: number,
    lon: number,
    longest: number,
    region: string,
    runways: number,
    type: string
}

export interface IRoute {
    distance: number;
}
