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
        DB_BlockNumber = result.number;
    } catch (e) {
        console.error(e.message);
    }

    if (latestBlock.number > DB_BlockNumber) {
        for (let i = DB_BlockNumber + 1; i <= latestBlock.number; i++) {
            const currentBlock = await web3.eth.getBlock(i, true);
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
                transactions,
                transactionsRoot,
            } = currentBlock;
            const sql = `INSERT INTO block(
                    difficulty, extraData, gasLimit, gasUsed, hash, 
                    miner, mixHash, nonce, number, parentHash, 
                    receiptsRoot, sha3Uncles, size, stateRoot, timestamp, 
                    totalDifficulty, transactionsRoot
                ) VALUES(
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

            if (transactions.length > 0) {
                for (let j = 0; j < transactions.length; j++) {
                    const tx = await web3.eth.getTransactionReceipt(transactions[j].hash);
                    const {
                        blockHash,
                        blockNumber,
                        contractAddress,
                        cumulativeGasUsed,
                        effectiveGasPrice,
                        from,
                        gasUsed,
                        status,
                        to,
                        transactionHash,
                        transactionIndex,
                        type,
                    } = tx;
                    const sql = `INSERT INTO transaction(
                        blockHash, blockNumber, contractAddress, cumulativeGasUsed, effectiveGasPrice, 
                        sender, gasUsed, status, receiver, transactionHash, 
                        transactionIndex, type
                    ) VALUES(
                        ?, ?, ?, ?, ?, 
                        ?, ?, ?, ?, ?, 
                        ?, ?
                    )`;
                    const params = [
                        blockHash,
                        blockNumber,
                        contractAddress,
                        cumulativeGasUsed,
                        effectiveGasPrice,
                        from,
                        gasUsed,
                        status,
                        to,
                        transactionHash,
                        transactionIndex,
                        type,
                    ];
                    try {
                        const [result] = await pool.execute(sql, params);
                    } catch (e) {
                        console.error(e.message);
                    }
                }
            }
        }
    }
    res.json({});
});

router.post('/:idx', async (req, res) => {
    const idx = req.body.payload;
    // select number, (unix_timestamp() - timestamp) as timestamp from block where number=169;
    const sql = `SELECT difficulty, extraData, gasLimit, gasUsed, hash, 
                    miner, mixHash, nonce, number, parentHash, 
                    receiptsRoot, sha3Uncles, size, stateRoot, totalDifficulty,
                    transactionsRoot, (unix_timestamp() - timestamp) AS timestamp
                    FROM block WHERE number=${idx}`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
