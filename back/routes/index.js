const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.post('/', async (req, res) => {
    try {
        const sql = `SELECT *, 
                        (SELECT SUM(tx.gasPrice * tx.gasUsed / POWER(10, 18)) + 2 
                            FROM transaction tx 
                            WHERE tx.blockNumber=bk.number) AS reward 
                    FROM block bk ORDER BY bk.number DESC LIMIT 15`;
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
