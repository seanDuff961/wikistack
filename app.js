const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layoutView = require('./views/layout');
const models = require('./models');
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');

const app = express();

const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get('/', (req, res, next) => {
  res.send(layoutView(''));
});

const PORT = 3000;

//integrate database sync
const init = async () => {
  await models.db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();


