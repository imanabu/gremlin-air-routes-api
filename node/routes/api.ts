import express = require('express');
import {AirRoutesDao} from "../daos/AirRoutesDao";
const router = express.Router();

const validateLabel = (label: string) => {
    switch(label) {
        case "airport": return label;
        case "country": return label;
        case "continent": return label;
        default: throw new Error(`Error: ${label} is not a valid label in the Air Routes DB`);
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

module.exports = router;
