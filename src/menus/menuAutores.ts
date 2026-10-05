import { Autor } from "../models/Autor";
import { AutorService } from "../services/autorService";
import { perguntar, perguntarNumero } from "../utils/prompt";

const servico = new AutorService();

export async function menuAutores(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log(`
===== AUTORES =====
1 - Cadastrar autor
2 - Listar autores
3 - Consultar autor por ID
4 - Atualizar autor
5 - Remover autor
0 - Voltar ao menu principal`);

    const opcao = await perguntar("Escolha uma opcao: ");

    try {
      switch (opcao.trim()) {
        case "1": await cadastrar(); break;
        case "2": await listar(); break;
        case "3": await consultar(); break;
        case "4": await atualizar(); break;
        case "5": await remover(); break;
        case "0": voltar = true; break;
        default: console.log("Opcao invalida. Tente novamente.");
      }
    } catch (erro) {
      console.log(`\n[ERRO] ${(erro as Error).message}\n`);
    }
  }
}

async function cadastrar(): Promise<void> {
  const nome = await perguntar("Nome do autor: ");
  const nacionalidade = await perguntar("Nacionalidade: ");
  const dataNascimento = await perguntar("Data de nascimento (AAAA-MM-DD): ");
  const id = await servico.cadastrar(new Autor(nome, nacionalidade, dataNascimento));
  console.log(`\nAutor cadastrado com sucesso. ID: ${id}\n`);
}

async function listar(): Promise<void> {
  const autores = await servico.listar();
  console.log("\nID  | NOME                     | NACIONALIDADE");
  console.log("----+--------------------------+------------------");
  autores.forEach((autor) => {
    console.log(
      `${String(autor.getId()).padEnd(3)} | ${autor.getNome().padEnd(24)} | ${autor.getNacionalidade()}`,
    );
  });
  console.log("");
}

async function consultar(): Promise<void> {
  const id = await perguntarNumero("ID do autor: ");
  const autor = await servico.buscarPorId(id);
  console.log(`\nID: ${autor.getId()}`);
  console.log(`Nome: ${autor.getNome()}`);
  console.log(`Nacionalidade: ${autor.getNacionalidade()}`);
  console.log(`Nascimento: ${autor.getDataNascimento()}\n`);
}

async function atualizar(): Promise<void> {
  const id = await perguntarNumero("ID do autor a atualizar: ");
  const nome = await perguntar("Novo nome: ");
  const nacionalidade = await perguntar("Nova nacionalidade: ");
  const dataNascimento = await perguntar("Nova data (AAAA-MM-DD): ");
  await servico.atualizar(new Autor(nome, nacionalidade, dataNascimento, id));
  console.log("\nAutor atualizado com sucesso.\n");
}

async function remover(): Promise<void> {
  const id = await perguntarNumero("ID do autor a remover: ");
  await servico.remover(id);
  console.log("\nAutor removido com sucesso.\n");
}
