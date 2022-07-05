import {describe, it} from "mocha";
import assert = require("assert");
import {GremlinDb} from "../daos/GremlinDb"

describe("100: Gremlin DB Test", () => {
    it("Should connect", (done) => {
        GremlinDb.open("");
        assert.ok(GremlinDb.g);
        GremlinDb.close();
        done();
    });
})
