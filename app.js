const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const sql = require('./util/database');
const app = express();

//allow cross-origin requests or this allows request from the client with different domain
app.use(cors());


app.use('/graphql', graphqlHTTP({
    //Graph Schema
    schema,
    graphiql: true
}));


//Sequelize table creation

sql.sync().then(result => {
    app.listen(4000, () => {
        console.log('now listening for request on port 4000');
    });    
}).catch(err => {
    console.log(err);
})


