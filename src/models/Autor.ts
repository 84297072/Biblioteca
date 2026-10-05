export class Autor {
  id: number | undefined;
  nome: string;
  nacionalidade: string;
  dataNascimento: string;

  constructor(nome: string, nacionalidade: string, dataNascimento: string, id?: number) {
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.dataNascimento = dataNascimento;
    this.id = id;
  }
}