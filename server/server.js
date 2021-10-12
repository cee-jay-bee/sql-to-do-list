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
app.delete('/tasks', (req,res)=> {
    console.log('/tasks delete hit:', req.query);
    const queryString = `DELETE FROM tasks WHERE id='${req.query.id}';`;
  
    pool.query(queryString).then((results)=>{
      res.sendStatus(200);
    }).catch((err)=>{
      console.log('error deleting task from database:', err);
      res.sendStatus(500);
    })
  })

app.get('/tasks', (req, res)=>{
    let queryString =  `SELECT * FROM tasks ORDER BY id`; // 'messages' is table name
    pool.query(queryString).then( ( results )=>{
        //if query is successful
        res.send( results.rows);
    }).catch( (err)=>{
        // if there was an error
        console.log(err);
        res.sendStatus( 500 );
    })
})

app.post('/tasks', (req, res)=>{
    console.log('/ post hit:', req.query)
    const queryString = 'INSERT INTO tasks (task, completed) VALUES ($1, $2)';
    let values = [req.body.task, false];
    
    pool.query(queryString, values).then((results)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log('error adding task to database', err);
        res.sendStatus(500);
    })  
})

app.put('/tasks', (req, res)=>{
    console.log('/put hit', req.query);
    const queryString = `UPDATE tasks SET completed=true WHERE id=${req.query.id};`

    pool.query(queryString).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error updating task in database:', err);
        res.sendStatus(500);
    })
})