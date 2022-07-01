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
        const error = Error(`Error: ${label} is not a valid label in the Air Routes DB`);
        if (!fp.find<string>(item => item == label)(Label.supported)) {
            throw error;
        } else {
            return label;
        }
    }

    public static async countVerticesOf(label: string): Promise<number> {
        const g = GremlinDb.g;
        AirRoutesDao.validateLabel(label);
        const result: IteratorResult<number> = await g.V().hasLabel(label).count().next();
        return result.value as number;
    }

    public static async find(label: string, property: string, value: any) {
        const g = GremlinDb.g;
        AirRoutesDao.validateLabel(label);
        return await g.V().has(label, property, value).toList();
    }

    public static async groupCountBy(kind: string, what: string): Promise<process.Traverser> {
        const t = GremlinDb.gt(kind);
        if (what === "label") {
            const r: process.Traverser[] = await t.label().groupCount().toList();
            return r[0];
        } else {
            const r = await t.groupCount().by(what).toList();
            return r[0];
        }
    }

    public static async has(kind: string, property: string, not: boolean) :
        Promise<process.Traverser[]> {
        const gt = GremlinDb.gt(kind);
        if (not) {
            return await gt.hasNot(property).toList();
        } else {
            return await gt.has(property).toList();
        }
    }

    public static async valueMap(kind: string, id: string) {
        const gt = GremlinDb.gt(kind, id);
        if (gt) {
           const list = await gt.valueMap(true).toList();
           return GremlinDb.mapToJson(list[0] as any);
        } else {
            return [];
        }

    }

    public static async version(): Promise<process.Traverser[]> {
        const g = GremlinDb.g;
        return await g.V().hasLabel(Label.version).values().toList();
    }
}
