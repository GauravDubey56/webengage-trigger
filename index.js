const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./db/db');

const KnexStore = require('connect-session-knex')(session)
const sessionStore = new KnexStore({knex: db})
const router = require('./routes')
const app = express();
require('dotenv').config({ path: './config.env' });
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(express.json());
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Marley',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )
// app.use('/auth', router.authRouter)
// app.use('/check', router.checkRouter)
// app.use('/csv', router.xlsRouter)

app.post('/status', async (req, res, next) => {
 try {
    console.log("data recived : ", req.body);
    return res.status(200).json({
    msg : "event recieved",
    success : false
  })
  } catch (error) {
    console.log("error : ", error)
    return res.status(200).json({
      err : "server error" + err,
      success : false
    })  
  }
})

const PORT =  process.env.PORT || 3306;
app.listen(PORT, () => console.log(`running on port ${PORT}`))
  