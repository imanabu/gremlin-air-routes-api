import {driver, process} from "gremlin";
import DriverRemoteConnection = driver.DriverRemoteConnection;
import traversal = process.traversal;

export class GremlinDb {

    public static get g(): process.GraphTraversalSource<process.GraphTraversal> {
        if (this._g) return this._g;
        else throw new Error("Please call open(url) to connect to the graph.");
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
}
