const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const { logger } = require('./middlewares/logger');
const corsOptions = require('./config/corsOptions');
const db = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;

db()
app.use(logger)
app.use('/', express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.get('/', (req, res) => {
  res.send("welcome world")
});

app.get('*', (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, '/views/404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: "404 not found" })
  } else {
    res.type('txt').send("404 not found")
  }
});

app.listen(PORT, () => console.log('app running on port http://localhost:3000'))