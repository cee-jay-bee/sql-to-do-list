const express = require('express');
const app = express();
const bodyParser= require ( 'body-parser');
// must require modules to use them
const pool = require('./modules/pool');


//uses
app.use (express.static( 'server/public' ));
app.use (bodyParser.urlencoded( { extended: true}));

// globals
const port = 5000;

// spin up server
app.listen ( port, ()=>{
    console.log( 'server is up on:', port);
})
// routes
// app.get('/inventory', (req, res)=>{
//     let queryString =  `SELECT * FROM items`; // 'messages' is table name
//     pool.query(queryString).then( ( results )=>{
//         //if query is successful
//         res.send( results.rows);
//     }).catch( (err)=>{
//         // if there was an error
//         console.log(err);
//         res.sendStatus( 500 );
//     })
// })