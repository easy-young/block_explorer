const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { pool } = require('../db');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'));

router.post('/create', async (req, res) => {
    const latestBlock = await web3.eth.getBlock('latest');
    let DB_BlockNumber = 0;

    try {
        const sql = `SELECT number FROM block ORDER BY number DESC LIMIT 1`;
        const [[result]] = await pool.execute(sql);
        DB_BlockNumber = result;
    } catch (e) {
        console.error(e.message);
    }

    if (latestBlock.number > DB_BlockNumber.number) {
        for (let i = 0; i < latestBlock.number - DB_BlockNumber.number; i++) {
            const {
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactionsRoot,
            } = latestBlock;
            const sql = `INSERT INTO block(
                    difficulty, extraData, gasLimit, gasUsed, hash, 
                    miner, mixHash, nonce, number, parentHash, 
                    receiptsRoot, sha3Uncles, size, stateRoot, timestamp, 
                    totalDifficulty, transactionsRoot
                ) values(
                    ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?,
                    ?, ?
                )`;
            const params = [
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactionsRoot,
            ];

            try {
                const [result] = await pool.execute(sql, params);
            } catch (e) {
                console.error(e.message);
            }
        }
    }
    res.json({});
});

router.post('/:idx', async (req, res) => {
    const { idx } = req.params;
    const sql = `SELECT * FROM block WHERE number=${idx}`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
