const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const mainRouter = require('./routes');
const blockRouter = require('./routes/block');
const txRouter = require('./routes/tx');
const allRouter = require('./routes/all');

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'jenny';

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: false,
    })
);

app.use('/', mainRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);
app.use('/all', allRouter);

app.listen(4000, () => {
    console.log('server start', 4000);
});
