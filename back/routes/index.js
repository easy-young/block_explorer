const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { pool } = require('../db');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'));

router.post('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM block ORDER BY number DESC LIMIT 15`;
        const sql2 = `SELECT * FROM transaction ORDER BY blockNumber DESC, transactionIndex DESC LIMIT 15`;
        const [result] = await pool.execute(sql);
        const [result2] = await pool.execute(sql2);
        res.json({ block: result, tx: result2 });
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
