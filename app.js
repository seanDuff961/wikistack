//npm install express
//npm install morgan


//declaraing variables
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layoutView = require('./views/layout');
const models = require('./models');

const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');


//define app and database
const app = express();
const { db } = require('./models');



//middleware
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/wiki', wikiRouter);


//connecting to database
db.authenticate().
then(() => {
  console.log('connected to the database');
})


//initializing
const PORT = 3000;


const init = async () => {
  await models.db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();


