const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET TRAIL DETAILS SERVER HIT');
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

router.get('/history', rejectUnauthenticated, (req, res) =>{
    console.log('GET HISTORY SERVER HIT');
    const queryHistory = `SELECT "review"."id" AS "review_id", "location"."name", "review".* FROM "review"
    JOIN "location" ON "location"."id"="review"."location_id";`;
    pool.query(queryHistory)
        .then(result => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error making SELECT for review:', error);
            res.sendStatus(500);
        })
});

router.post('/history', (req, res) =>{
    console.log('POST REQUEST FOR HISTORY SERVER HIT');
            res.sendStatus(200)
});

router.post('/confirm', rejectUnauthenticated, (req, res) => {
    console.log('CONFIRM POST SERVER', req.body)
    const queryConfirm =`INSERT INTO "review"("user_id", "location_id", "visit_date", "time") 
    VALUES($1, $2, $3, $4);`
    pool.query(queryConfirm, [req.body.user_id, req.body.location_id,req.body.date,req.body.time])
    .then(()=>{
        res.sendStatus(201);
    }).catch(error =>{
        console.log('error making INSERT for post hike', error);
        res.sendStatus(500);
    })
});

module.exports = router;