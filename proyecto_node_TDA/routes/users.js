var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('Users', {
    h1: 'Usarios',
    description: 'description description'
  });
});

module.exports = router;
