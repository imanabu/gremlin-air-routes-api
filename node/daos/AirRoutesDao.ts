import {GremlinDb} from "./GremlinDb";
import {Label} from "../models/Label";
import {process} from "gremlin";
import fp = require("lodash/fp");
// import static org.apache.tinkerpop.gremlin.structure.T.*;

// import org.apache.tinkerpop.gremlin.process.traversal.dsl.graph.GraphTraversalSource;
// import org.apache.tinkerpop.gremlin.process.traversal.IO;
// import static org.apache.tinkerpop.gremlin.process.traversal.AnonymousTraversalSource.traversal;
// import static org.apache.tinkerpop.gremlin.process.traversal.Operator.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.Order.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.P.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.Pop.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.SackFunctions.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.Scope.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.TextP.*;
// import static org.apache.tinkerpop.gremlin.structure.Column.*;
// import static org.apache.tinkerpop.gremlin.structure.Direction.*;
// import static org.apache.tinkerpop.gremlin.structure.T.*;
// import static org.apache.tinkerpop.gremlin.process.traversal.dsl.graph.__.*;

export class AirRoutesDao {
    // Reference: https://tinkerpop.apache.org/docs/current/reference/#gremlin-javascript

    public static validateLabel = (label: string) => {
        let error = Error(`Error: ${label} is not a valid label in the Air Routes DB`);
        if (!fp.find<string>(item => item == label)(Label.supported)) {
            throw error;
        } else {
            return label;
        }
    }

    public static async countVerticesOf(label: string): Promise<number> {
        const g = GremlinDb.g;
        AirRoutesDao.validateLabel(label);
        let result: IteratorResult<number> = await g.V().hasLabel(label).count().next();
        return result.value as number;
    }

    public static async find(label: string, property: string, value: any) {
        const g = GremlinDb.g;
        AirRoutesDao.validateLabel(label);
        return await g.V().has(label, property, value).toList();
    }

    public static async groupCountBy(kind: string, what: string) {
        const g = GremlinDb.g;
        let t;
        if (kind === "v") {
            t = g.V()
        } else if (kind === "e") {
            t = g.E()
        }
        if (what === "label") {
            let r = await t.label().groupCount().toList();
            return r[0];
        } else {
            let r = await t.groupCount().by(what).toList();
            return r[0];
        }
    }

    public static async has(kind: string, property: string, not: boolean) {
        const g = GremlinDb.g;
        if (kind === "v") {
            if (not) {
                return await g.V().hasNot(property).toList();
            } else {
                return await g.V().has(property).toList();
            }
        }
        if (kind === "e") {
            if (not) {
                return await g.E().hasNot(property).toList();
            } else {
                return await g.E().has(property).toList();
            }
        }
        return [];
    }

    public static async valueMap(kind: string, id: string) {
        const g = GremlinDb.g;
        let t;
        if (kind === "v") {
            t = g.V(id);
        } else if(kind === "e") {
            t = g.E(id);
        }
        if (t) {
           let list = await t.valueMap(true).toList();
           return GremlinDb.mapToJson(list[0]);
        } else {
            return [];
        }

    }

    public static async version(): Promise<process.Traverser[]> {
        const g = GremlinDb.g;
        return await g.V().hasLabel(Label.version).values().toList();
    }
}
