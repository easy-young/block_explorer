const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.post('/blockNumber', async (req, res) => {
    const { number } = req.body;
    const sql = `SELECT COUNT(*) AS count FROM block WHERE number=${number}`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

router.post('/blockHash', async (req, res) => {
    const { blockHash } = req.body;
    const sql = `SELECT number FROM block WHERE hash='${blockHash}'`;
    try {
        const [[result]] = await pool.execute(sql);
        console.log(result);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

router.post('/txHash', async (req, res) => {
    const { txHash } = req.body;
    const sql = `SELECT blockNumber FROM transaction WHERE transactionHash='${txHash}'`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

// router.post('/miner', async (req, res) => {
//     const { miner } = req.body;
//     const sql = `SELECT number FROM block WHERE miner='${miner}'`;
//     try {
//         let [result] = await pool.execute(sql);
//         result = result.map((v) => v.number);
//         console.log(result);
//         res.json(result);
//     } catch (e) {
//         console.error(e.message);
//         res.json({});
//     }
// });

module.exports = router;
