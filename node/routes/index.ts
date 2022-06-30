import express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _) {
  res.render('index', { title: 'Air Routes Express' });
});

module.exports = router;
