import express = require('express');
import {AirRoutesDao} from "../daos/AirRoutesDao";
const router = express.Router();


// This is the basic http://localhost:3000 response.
router.get('/', async function(req, res, _) {
  let dao = AirRoutesDao;
  let airports = await dao.totalAirports();
  res.render('index', { title: 'Air Routes Express', message: `${airports}` });
});

module.exports = router;
