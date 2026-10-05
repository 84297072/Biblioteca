import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/autorRepository";

export class AutorService {
  private repositorio = new AutorRepository();

  public async cadastrar(dados: Autor): Promise<number> {
    this.validar(dados);
    return this.repositorio.cadastrar(dados);
  }

  public async listar(): Promise<Autor[]> {
    const autores = await this.repositorio.listar();
    if (autores.length === 0) {
      throw new Error("Nenhum autor cadastrado ate o momento.");
    }
    return autores;
  }

  public async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.repositorio.buscarPorId(id);
    if (!autor) {
      throw new Error("Autor nao encontrado.");
    }
    return autor;
  }

  public async atualizar(autor: Autor): Promise<void> {
    const existente = await this.repositorio.buscarPorId(autor.getId()!);
    if (!existente) {
      throw new Error("Autor nao encontrado.");
    }
    this.validar(autor);
    await this.repositorio.atualizar(autor);
  }

  public async remover(id: number): Promise<void> {
    const autor = await this.repositorio.buscarPorId(id);
    if (!autor) {
      throw new Error("Autor nao encontrado.");
    }
    await this.repositorio.remover(id);
  }

  private validar(autor: Autor): void {
    if (!autor.getNome() || autor.getNome().trim().length < 3) {
      throw new Error("O nome do autor deve ter pelo menos 3 caracteres.");
    }
  }
}
