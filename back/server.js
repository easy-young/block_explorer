const express = require('express');
const app = express();
const cors = require('cors');
const blockRouter = require('./routes/block');
const transactionRouter = require('./routes/transaction');

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);

app.use('/block', blockRouter);
app.use('/transaction', transactionRouter);

app.listen(4000, () => {
    console.log('server start', 4000);
});
