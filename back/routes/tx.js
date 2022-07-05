const express = require('express');
const router = express.Router();
const { pool } = require('../db');

router.post('/:idx', async (req, res) => {
    const idx = req.body.payload;
    const sql = `SELECT * FROM transaction where transactionHash='${idx}'`;
    try {
        const [[result]] = await pool.execute(sql);
        res.json(result);
    } catch (e) {
        console.error(e.message);
        res.json({});
    }
});

module.exports = router;
