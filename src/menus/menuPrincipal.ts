import { perguntar } from "../utils/prompt";
import { menuAutores } from "./menuAutores";
import { menuLivros } from "./menuLivros";
import { menuClientes } from "./menuClientes";
import { menuEmprestimos } from "./menuEmprestimos";
import { menuRelatorios } from "./menuRelatorios";

const OPCOES = [
  "==============================",
  "   SISTEMA DE BIBLIOTECA",
  "==============================",
  "1 - Autores",
  "2 - Livros",
  "3 - Clientes",
  "4 - Emprestimos",
  "5 - Relatorios",
  "0 - Encerrar aplicacao",
].join("\n");

export async function menuPrincipal(): Promise<void> {
  let executando = true;
  while (executando) {
    console.log(OPCOES);
    const opcao = await perguntar("Escolha uma opcao: ");
    switch (opcao.trim()) {
      case "1": await menuAutores(); break;
      case "2": await menuLivros(); break;
      case "3": await menuClientes(); break;
      case "4": await menuEmprestimos(); break;
      case "5": await menuRelatorios(); break;
      case "0":
        console.log("Encerrando o sistema...");
        executando = false;
        break;
      default: console.log("Opcao invalida. Tente novamente.");
    }
  }
}
