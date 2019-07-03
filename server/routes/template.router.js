const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('SERVER HIT');
    const queryText = `SELECT * FROM "location" ORDER by "id"`;
    pool.query(queryText)
        .then(result => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error making SELECT for location:', error);
            res.sendStatus(500);
        })
});



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;