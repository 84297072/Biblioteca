import readline from "readline/promises";

export const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function perguntar(mensagem: string): Promise<string> {
  return terminal.question(mensagem);
}

export async function perguntarNumero(mensagem: string): Promise<number> {
  const resposta = await terminal.question(mensagem);
  const numero = Number(resposta);
  if (Number.isNaN(numero)) {
    throw new Error("Informe um numero valido.");
  }
  return numero;
}
