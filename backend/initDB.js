import db from "./db.js";

// Cria tabela de livros
db.exec(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    genero TEXT NOT NULL,
    totalPaginas INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Quero Ler'
  )
`);

// Cria tabela de leituras
db.exec(`
  CREATE TABLE IF NOT EXISTS leituras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livro_id INTEGER NOT NULL,
    paginasLidas INTEGER NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
  )
`);

// Insere dados de exemplo

db.exec(`
  INSERT INTO livros (titulo, autor, genero, totalPaginas, status) VALUES
  ('Noites Brancas', 'Fiódor Dostoiévski', 'Romance', 96, 'Finalizado'),
  ('Memórias do Subsolo', 'Fiódor Dostoiévski', 'Ficção', 152, 'Lendo');

  INSERT INTO leituras (livro_id, paginasLidas, data) VALUES
  (1, 50, '2025-03-10'),
  (2, 60, '2025-03-20');
`);