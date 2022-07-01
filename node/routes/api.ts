import express = require('express');
import {AirRoutesDao} from "../daos/AirRoutesDao";
import {GremlinDb} from "../daos/GremlinDb";

const router = express.Router();

router.get('/count/:label', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const label = req.params.label;
        const count = await dao.countVerticesOf(label);
        return res.json({label, count});
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/find/:label/:property/:value', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const label = req.params.label;
        const property = req.params.property;
        const value = req.params.value;
        return res.json(await dao.find(label, property, value));
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/group-count/:kind/by/:what', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const result = await dao.groupCountBy(req.params.kind, req.params.what)
        return res.json(GremlinDb.mapToJson(result as any));
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/has/:kind/:property', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        return res.json(await dao.has(req.params.kind, req.params.property, false));
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/has-not/:kind/:property', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const result = await dao.has(req.params.kind, req.params.property, true)
        return res.json(result);
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/value-map/:kind/:id', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const result = await dao.valueMap(req.params.kind, req.params.id);
        return res.json(result);
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

router.get('/version', async (req, res, _) => {
    try {
        const dao = AirRoutesDao;
        const version = await dao.version();
        return res.json(version);
    } catch (why) {
        const message = (why as Error).message;
        return res.status(400).send({message});
    }
});

module.exports = router;
