import {after, before, describe, it} from "mocha";
import assert = require("assert");
import {GremlinDb} from "../daos/GremlinDb"
import app = require("../app");
import express = require("express");

const myApp: any = app;
const root = "http://localhost:8000";
import request = require("superagent");
let server: any = {};

describe("200: Api CRUD Spec", () => {
    const hmb = {
        "id": null,
        "label": "airport",
        "country": "US",
        "code": "HMBINT",
        "longest": 100,
        "city": "Half Moon Bay",
        "elev": 12,
        "icao": "TEST",
        "lon": -179.996002197266,
        "type": "airport",
        "region": "US-CA",
        "runways": 1,
        "lat": 0.01,
        "desc": "Half Moon Bay International"
    }

    before(() => {
        server = myApp.listen(8000);
        GremlinDb.open("");
    });

    it("Should respond to the root URL.", (done) => {
        request.get(`${root}`)
            .end(() => {
                done();
            });
    });

    it("Should return the airport count > 3000.", (done) => {
        request.get(`${root}/api/count/airport`)
            .end((err: express.Error, res: express.ServerResponse) => {
                if (err) {
                    assert(!err, `Post error ${res.body.errors.message}`);
                    done();
                }
                assert(res, "No response");
                assert(res.body, "No body");
                const js = res.body as any;
                assert(js.label === "airport");
                assert(js.count > 3000);
                done();
            });
    });

    it("Can add a test 'HMBINT' airport.", (done) => {
        request.post(`${root}/api/upsert/airport`)
            .send(hmb)
            .end((err: express.Error, res: express.ServerResponse) => {
                if (err) {
                    assert(!err, `Post error ${res.body.errors.message}`);
                    done();
                }
                assert(res, "No response");
                done();
            });
    });

    let foundHmb: any[] = [];

    it("Should find the HMBINT airport.", (done) => {
        request.get(`${root}/api/find/airport/code/HMBINT`)
            .end((err: express.Error, res: express.ServerResponse) => {
                if (err) {
                    assert(!err, `Post error ${res.body.errors.message}`);
                    done();
                }
                assert(res, "No response");
                assert(res.body, "No body");
                const list = res.body as any[];
                foundHmb = list.map(i => i.id);
                done();
            });
    });

    it("Can delete all the HMBINT airports.", (done) => {
        foundHmb.forEach(id => {
            request.delete(`${root}/api/delete/v/airport/${id}`)
                .end((err: express.Error, res: express.ServerResponse) => {
                    if (err) {
                        assert(!err, `Delete error ${res.body.errors.message}`);
                        done();
                    }
                    assert(res, "No response");
                    assert(res.body, "No body");
                });
        })
        done();
    });

    it("Should no longer find the HMBINT airport.", (done) => {
        request.get(`${root}/api/find/airport/code/HMBINT`)
            .end((err: express.Error, res: express.ServerResponse) => {
                if (err) {
                    assert(!err, `Post error ${res.body.errors.message}`);
                    done();
                }
                assert(res, "No response");
                assert(res.body, "No body");
                const list = res.body as any[];
                // console.log(`list.length = ${list.length}`);
                assert(list.length === 0);
                done();
            });
    });

    it("Should still find the Austin (AUS) airport.", (done) => {
        request.get(`${root}/api/find/airport/code/AUS`)
            .end((err: express.Error, res: express.ServerResponse) => {
                if (err) {
                    assert(!err, `Post error ${res.body.errors.message}`);
                    done();
                }
                assert(res, "No response");
                assert(res.body, "No body");
                const list = res.body as any[];
                assert(list.length === 1);
                done();
            });
    });

    after((done) => {
        GremlinDb.close();
        done();
        process.exit();
    });
})
