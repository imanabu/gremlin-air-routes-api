import {driver, process} from "gremlin";
import DriverRemoteConnection = driver.DriverRemoteConnection;
import traversal = process.traversal;

export class GremlinDb {

    public static get g(): process.GraphTraversalSource<process.GraphTraversal> {
        if (this._g) return this._g;
        else throw new Error("Please call open(url) to connect to the graph.");
    }

    public static gt(kind: string, id?: any): process.GraphTraversal {
        if (this._g) {
            if (kind === "v") {
                if (id) {
                    return this._g.V(id);
                }
                return this._g.V();
            } else if (kind === "e") {
                if (id) {
                    return this._g.E(id);
                }
                return this._g.E();
            }
        }
        throw new Error("Please call open(url) to connect to the graph.");
    }

    private static _g: process.GraphTraversalSource<process.GraphTraversal> | null = null;
    private static _drc: DriverRemoteConnection | null = null;

    public static open = (url: string | undefined): void => {
        let my = GremlinDb;
        let finalUrl = 'ws://localhost:8182/gremlin';
        if (url) {
            finalUrl = url;
        }
        if (!my._drc) {
            my._drc = new DriverRemoteConnection(finalUrl)
            my._g = traversal().withRemote(my._drc);
        }
    }

    public static close = (): void => {
        let my = GremlinDb;
        if (my._drc) {
            my._drc.close().then(() => {
                my._g = null;
                my._drc = null;
            });
        }
    }

    public static mapToJson(m: Map<string, any>): any {
        let keys = m.keys();

        const toS = (x) => {
            if (!x) { return "null"; }
            switch(typeof(x)) {
                case "boolean":
                    if (x) {
                        return "true";
                    } else {
                        return "false";
                    }
                case "number":
                    return `${x}`;
                default:
                    return `"${x}"`;
            }
        }

        let s = "{";
        let valStr = "";
        for(let key of keys) {
            let val = m.get(key);
            if (Array.isArray(val)) {
                let a = val as Array<any>;
                let len = a.length;
                if (len == 1) {
                    valStr = toS(a[0]);
                } else {
                    let index = 0;
                    valStr = "[";
                    for(let item of a) {
                        index++;
                        valStr += toS(item);
                        if (index < len) valStr += ",";
                    }
                    valStr += "]";
                }

            } else {
                valStr = toS(val);
            }
            s += `"${key}": ${valStr},`
        }
        s += "}"
        s = s.replace(",}", "}");
        return JSON.parse(s);
    }
}
