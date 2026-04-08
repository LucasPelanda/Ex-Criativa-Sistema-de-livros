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
const inserirLivro = db.prepare(`
  INSERT INTO livros (titulo, autor, genero, totalPaginas, status)
  VALUES (?, ?, ?, ?, ?)
`);

const inserirLeitura = db.prepare(`
  INSERT INTO leituras (livro_id, paginasLidas, data)
  VALUES (?, ?, ?)
`);

// Verifica se já existem dados
const count = db.prepare("SELECT COUNT(*) as total FROM livros").get();

if (count.total === 0) {
  const livros = [
    ["O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 1178, "Lendo"],
    ["1984", "George Orwell", "Ficção Científica", 328, "Finalizado"],
    ["Dom Casmurro", "Machado de Assis", "Romance", 256, "Finalizado"],
    ["Duna", "Frank Herbert", "Ficção Científica", 604, "Lendo"],
    ["O Hobbit", "J.R.R. Tolkien", "Fantasia", 310, "Quero Ler"],
  ];

  const inserirTodos = db.transaction(() => {
    for (const livro of livros) {
      inserirLivro.run(...livro);
    }

    // Leituras de exemplo
    const leituras = [
      [1, 120, "2025-03-20"],
      [1, 80, "2025-03-25"],
      [1, 50, "2025-04-01"],
      [2, 150, "2025-02-10"],
      [2, 178, "2025-02-15"],
      [3, 100, "2025-01-05"],
      [3, 156, "2025-01-12"],
      [4, 200, "2025-03-28"],
      [4, 100, "2025-04-02"],
    ];

    for (const leitura of leituras) {
      inserirLeitura.run(...leitura);
    }
  });

  inserirTodos();
  console.log("Banco de dados criado com sucesso!");
  console.log("5 livros e 9 leituras inseridos.");
} else {
  console.log("Banco de dados já possui dados. Nenhuma inserção feita.");
}