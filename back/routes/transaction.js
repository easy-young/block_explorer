const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { pool } = require('../db');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'));

router.post('/:hash', async (req, res) => {
    const { hash } = req.params;
    const sql = `SELECT * FROM transaction where transactionHash='${hash}'`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
