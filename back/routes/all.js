const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.post('/block', async (req, res) => {
    // const sql = `SELECT * FROM block ORDER BY number DESC LIMIT 100`;
    const sql = `SELECT difficulty, extraData, gasLimit, gasUsed, hash, 
                    miner, mixHash, nonce, number, parentHash, 
                    receiptsRoot, sha3Uncles, size, stateRoot, totalDifficulty,
                    transactionsRoot, (unix_timestamp() - timestamp) AS timestamp 
                FROM block ORDER BY number DESC`;
    try {
        const [result] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

router.post('/tx', async (req, res) => {
    const sql = `SELECT * FROM transaction ORDER BY blockNumber DESC, transactionIndex DESC LIMIT 100`;
    try {
        const [result] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
