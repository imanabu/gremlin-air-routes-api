import express = require('express');
import {AirRoutesDao} from "../daos/AirRoutesDao";

import {GremlinDb} from "../daos/GremlinDb";
const router = express.Router();

router.get('/count/:label', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let label = req.params.label
        let count = await dao.countVerticesOf(label);
        return res.json({label, count});
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

router.get('/find/:label/:property/:value', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let label = req.params.label;
        let property = req.params.property;
        let value = req.params.value;
        return res.json(await dao.find(label, property, value));
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

router.get('/group-count/:kind/by/:what', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let result = await dao.groupCountBy(req.params.kind, req.params.what)
        return res.json(GremlinDb.mapToJson(result));
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

router.get('/has/:kind/:property', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        return res.json(await dao.has(req.params.kind, req.params.property, false));
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

router.get('/has-not/:kind/:property', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let result = await dao.has(req.params.kind, req.params.property, true)
        return res.json(result);
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

router.get('/value-map/:kind/:id', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let result = await dao.valueMap(req.params.kind, req.params.id);
        return res.json(result);
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/version', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let version = await dao.version();
        return res.json(version);
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
    }
});

module.exports = router;
