/**
 * The default endpoint for Lifty.
 * Only useful for telling if the backend is online.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("You mirin brah?");
});

module.exports = router;
