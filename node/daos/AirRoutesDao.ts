import {GremlinDb} from "./GremlinDb";

export class AirRoutesDao {
    // Reference: https://tinkerpop.apache.org/docs/current/reference/#gremlin-javascript

    public static totalAirports: () => Promise<number> = async () => {
        let g = GremlinDb.g;
        let result: IteratorResult<number> = await g.V().hasLabel("airport").count().next();
        return result.value
    }
}
