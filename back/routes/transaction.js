const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { pool } = require('../db');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'));

router.post('/create', async (req, res) => {
    const tx = await web3.eth.getTransactionReceipt('0x7714aebc8965351092d4fdae72681392dd3ce56557cf96858b45adb7197f8be4');
    // console.log(tx.type.length);
});

router.post('/:idx', async (req, res) => {
    const { idx } = req.params;
    const sql = `SELECT * FROM transaction`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
