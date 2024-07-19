import express from 'express';
import { Pool } from 'pg';

const app = express();
const pool = new Pool();

app.get('/securities', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM securities');
  res.json(rows);
});

app.get('/securities/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { rows: securityRows } = await pool.query('SELECT * FROM securities WHERE ticker = $1', [symbol]);
  const { rows: priceRows } = await pool.query('SELECT * FROM prices WHERE ticker = $1 ORDER BY date ASC', [symbol]);
  res.json({ security: securityRows[0], prices: priceRows });
});

app.listen(5432, () => {
  console.log('Server is running on port 3000');
});