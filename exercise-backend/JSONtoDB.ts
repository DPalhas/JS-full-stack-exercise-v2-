import fs from 'fs';
import { Pool } from 'pg';

interface Price {
  date: string;
  close: string;
  volume: string;
}

interface Security {
  ticker: string;
  securityName: string;
  sector: string;
  country: string;
  trend: number;
  prices: Price[];
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DBExercise',
  password: 'engine41',
  port: 5432,
});

const insertData = async () => {
  try {
    const rawData = fs.readFileSync('C:\\Users\\david\\OneDrive\\Documentos\\GitHub\\JS-full-stack-exercise-v2-\\exercise-backend\\data.json', 'utf-8');
    const data: Security[] = JSON.parse(rawData);

    await pool.query('BEGIN');
    const securitiesQuery = `INSERT INTO securities (ticker, securityName, sector, country, trend) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (ticker) DO NOTHING`;
    const pricesQuery = `INSERT INTO prices (ticker, date, close, volume) VALUES ($1, $2, $3, $4)`;

    for (const security of data) {
      await pool.query(securitiesQuery, [
        security.ticker,
        security.securityName,
        security.sector,
        security.country,
        security.trend,
      ]);

      for (const price of security.prices) {
        await pool.query(pricesQuery, [
          security.ticker,
          price.date,
          price.close,
          price.volume,
        ]);
      }
    }

    await pool.query('COMMIT');
    console.log('Data insertion complete');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error inserting data:', err);
  } finally {
    pool.end();
  }
};
insertData();
