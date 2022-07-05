import {GremlinDb} from "./GremlinDb";
import {Label} from "../models/Label";
import {process} from "gremlin";
import fp = require("lodash/fp");
// import toLong = structure.toLong;
import GraphTraversal = process.GraphTraversal;

const __ = process.statics;
// const T = process.t;
// const P = process.P

// const Path = graphModule.Path;
// const t = traversalModule.t;
// const P = traversalModule.P;
// const direction = traversalModule.direction;

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

    public static async delete(kind: string, label: string, id: string): Promise<void> {
        const r = await GremlinDb.gt(kind).hasLabel(label).hasId(id).toList();
        if (r.length == 0) {
            throw new Error(`No element ${kind} of ${label} with the id of ${id}`);
        }
        await GremlinDb.gt(kind).hasLabel(label).hasId(id).drop().iterate();
    }

    /**
     * Put your own experiment code here.
     */
    public static async experiment(): Promise<any> {
        const g = GremlinDb.g;
        const from = "AUS";
        const to = "SFO";
        const list = await g.V().has('code', from).until(__.has('code', to)).repeat(__.out().simplePath()).limit(100).path().by("code").toList();
        if (list.length > 0) {
            return list.map(p => (p as any).objects)
                .map(o => {
                    let r = "";
                    let i = 1;
                    for (i; i <= o.length; i++) {
                        r += o[i - 1];
                        if (i != o.length) r += "->";
                    }
                    return r;
                })
        }
        return {};
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

    public static async has(kind: string, property: string, not: boolean):
        Promise<process.Traverser[]> {
        const gt = GremlinDb.gt(kind);
        if (not) {
            return await gt.hasNot(property).toList();
        } else {
            return await gt.has(property).toList();
        }
    }

    /**
     * Find the shortest paths between airports
     */
    public static async findShortedPath(from: string, to: string, limit: number): Promise<any> {
        const g = GremlinDb.g;
        const list = await g.V().has('code', from)
            .until(__.has('code', to))
            .repeat(__.out().simplePath())
            .limit(limit).path().by("code").toList();
        if (list.length > 0) {
            return list.map(p => (p as any).objects)
                .map(o => {
                    let r = "";
                    let i = 1;
                    for (i; i <= o.length; i++) {
                        r += o[i - 1];
                        if (i != o.length) r += "->";
                    }
                    return r;
                })
        }
        return {};
    }


    public static async upsert(label: string, value: any) {
        const my = this;
        my.validateLabel(label);
        const id = value.id;

        const setFromJson = (tp: GraphTraversal) => {
            for (let key of Object.keys(value)) {
                if (!(key == "id" || key == "label")) {
                    let x = value[key];
                    tp.property(key, x)
                }
            }
            return tp;
        }

        const upsertAirport = () => {
            const g = GremlinDb.g;
            let t: GraphTraversal;
            if (!id) {
                t = g.addV(Label.airport);
            } else {
                t = g.V(id);
            }
            setFromJson(t).iterate();
        }

        switch (label) {
            case "airport":
                return upsertAirport();
            default:
                throw new Error(`${label} upsert not yet available`);
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
