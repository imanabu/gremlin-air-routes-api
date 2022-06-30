import express = require('express');
import {AirRoutesDao} from "../daos/AirRoutesDao";
import * as _ from "lodash/fp";
import {Label} from "../models/Label";
const router = express.Router();

const validateLabel = (label: string) => {
    let error = Error(`Error: ${label} is not a valid label in the Air Routes DB`);
    if (!_.find<string>(item => item == label)(Label.supported)) {
        throw error;
    } else {
        return label;
    }
}

router.get('/count/:label', async function(req, res, _) {
    try {
        let dao = AirRoutesDao;
        let label = req.params.label
        validateLabel(label);
        let count = await dao.countVerticesOf(label);
        return res.json({label, count});
    } catch (why) {
        let message = (why as Error).message;
        return res.status(400).send({ message });
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
