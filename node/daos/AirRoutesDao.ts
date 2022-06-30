import {Label} from "../models/Label";
import {GremlinDb} from "./GremlinDb";

export class AirRoutesDao {

    // Reference: https://tinkerpop.apache.org/docs/current/reference/#gremlin-javascript

    constructor() {
        GremlinDb.open("")
    }

    public howManyAirports: () => Object = () => {
        let g = GremlinDb.g;
        return g.V().has(Label.airport).count().toList()[0] as number
    }
}
