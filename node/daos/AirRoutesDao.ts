import {GremlinDb} from "./GremlinDb";

export class AirRoutesDao {
    // Reference: https://tinkerpop.apache.org/docs/current/reference/#gremlin-javascript

    public static countVerticesOf: (string) => Promise<number> = async (label: string) => {
        let g = GremlinDb.g;
        let result: IteratorResult<number> = await g.V().hasLabel(label).count().next();
        return result.value
    }
}
