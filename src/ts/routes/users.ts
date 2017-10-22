/// <reference path="../../_all.d.ts" />
'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req: any, res: any, next) => {
  res.send('respond with a resource');
});

module.exports = router;
