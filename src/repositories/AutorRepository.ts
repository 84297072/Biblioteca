import { query } from '../database/connection';
import { Autor } from '../models/Autor';


export class AutorRepository {
  async cadastrar(autor: Autor): Promise<Autor> {
    const sql = `
      INSERT INTO autor (nome, nacionalidade, data_nascimento)
      VALUES ($1, $2, $3)
      RETURNING id, nome, nacionalidade, data_nascimento
    `;
    const [linha] = await query(sql, [autor.nome, autor.nacionalidade, autor.dataNascimento]);
    return this.paraModelo(linha);
  }

  async listar(): Promise<Autor[]> {
    const linhas = await query('SELECT id, nome, nacionalidade, data_nascimento FROM autor ORDER BY nome');
    return linhas.map((l) => this.paraModelo(l));
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const linhas = await query(
      'SELECT id, nome, nacionalidade, data_nascimento FROM autor WHERE id = $1',
      [id],
    );
    return linhas.length ? this.paraModelo(linhas[0]) : null;
  }

  async atualizar(id: number, autor: Autor): Promise<Autor | null> {
    const sql = `
      UPDATE autor SET nome = $1, nacionalidade = $2, data_nascimento = $3
      WHERE id = $4
      RETURNING id, nome, nacionalidade, data_nascimento
    `;
    const linhas = await query(sql, [autor.nome, autor.nacionalidade, autor.dataNascimento, id]);
    return linhas.length ? this.paraModelo(linhas[0]) : null;
  }

  async remover(id: number): Promise<boolean> {
    const linhas = await query('DELETE FROM autor WHERE id = $1 RETURNING id', [id]);
    return linhas.length > 0;
  }

  private paraModelo(linha: any): Autor {
    return new Autor(linha.nome, linha.nacionalidade, linha.data_nascimento, linha.id);
  }
}