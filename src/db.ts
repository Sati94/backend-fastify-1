import { Pool } from 'pg';
import { config } from './config'

export type DbClient = {
  query: <RowType>(query: string, params?: any[]) => Promise<RowType[] | RowType>;
}

export function createPgClient(): DbClient {
  const pool = new Pool({
    connectionString: config.databaseURL
  });
  return {
    async query(sql: string, params?: any[]) {
      const result = await pool.query(sql, params);
      return result.rows;
    }

  }
}