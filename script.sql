CREATE TABLE autor (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  nacionalidade VARCHAR(80),
  data_nascimento DATE
);

CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  telefone VARCHAR(20)
);

CREATE TABLE livro (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  ano_publicacao INT,
  quantidade_total INT NOT NULL DEFAULT 1,
  quantidade_disponivel INT NOT NULL DEFAULT 1,
  autor_id INT NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES autor (id)
);

CREATE TABLE emprestimo (
  id SERIAL PRIMARY KEY,
  livro_id INT NOT NULL,
  cliente_id INT NOT NULL,
  data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
  data_devolucao DATE,
  FOREIGN KEY (livro_id) REFERENCES livro (id),
  FOREIGN KEY (cliente_id) REFERENCES cliente (id)
);