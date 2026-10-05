import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const resultado = await pool.query(sql, params);
  return resultado.rows as T[];
} catch (erro) {
    console.error("Erro na consulta:", (erro as Error).message);
    throw erro;
  }


export async function withTransaction<T>(
  operacao: (cliente: PoolClient) => Promise<T>,
): Promise<T> {
  const cliente = await pool.connect();
  try {
    await cliente.query("BEGIN");
    const resultado = await operacao(cliente);
    await cliente.query("COMMIT");
    return resultado;
  } catch (erro) {
    await cliente.query("ROLLBACK");
    throw erro;
  } finally {
    cliente.release();
  }
}