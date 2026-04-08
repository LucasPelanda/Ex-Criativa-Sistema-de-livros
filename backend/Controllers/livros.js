import db from "../db.js";

// GET - Listar todos os livros
export const getLivros = (_, res) => {
  try {
    const livros = db.prepare(`
      SELECT livros.*, 
        COALESCE(SUM(leituras.paginasLidas), 0) as paginasLidas
      FROM livros
      LEFT JOIN leituras ON livros.id = leituras.livro_id
      GROUP BY livros.id
      ORDER BY livros.id DESC
    `).all();

    return res.status(200).json(livros);
  } catch (err) {
    return res.status(500).json({ error: "mais erro mano" });
  }
};


// GET - Buscar um livro por ID
export const getLivro = (req, res) => {
  try {
    const livro = db.prepare(`
      SELECT livros.*, 
        COALESCE(SUM(leituras.paginasLidas), 0) as paginasLidas
      FROM livros
      LEFT JOIN leituras ON livros.id = leituras.livro_id
      WHERE livros.id = ?
      GROUP BY livros.id
    `).get(req.params.id);

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    return res.status(200).json(livro);
  } catch (err) {
    return res.status(500).json({ error: "mais erro mano" });
  }
};

// POST - Criar novo livro
export const createLivro = (req, res) => {
  const { titulo, autor, genero, totalPaginas, status } = req.body;

  // Validação
  if (!titulo || !autor || !genero || !totalPaginas || !status) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (totalPaginas <= 0) {
    return res.status(400).json({ error: "Total de páginas deve ser um número positivo." });
  }

  const statusValidos = ["Lendo", "Finalizado", "Quero Ler"];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ error: "Status inválido." });
  }

  try {
    const result = db.prepare(`
      INSERT INTO livros (titulo, autor, genero, totalPaginas, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(titulo, autor, genero, totalPaginas, status);

    return res.status(201).json({ id: result.lastInsertRowid, message: "Livro criado com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar livro." });
  }
};

// PUT - Atualizar livro
export const updateLivro = (req, res) => {
  const { titulo, autor, genero, totalPaginas, status } = req.body;

  // Validação
  if (!titulo || !autor || !genero || !totalPaginas || !status) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (totalPaginas <= 0) {
    return res.status(400).json({ error: "Total de páginas deve ser um número positivo." });
  }

  const statusValidos = ["Lendo", "Finalizado", "Quero Ler"];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ error: "Status inválido." });
  }

  try {
    const result = db.prepare(`
      UPDATE livros SET titulo = ?, autor = ?, genero = ?, totalPaginas = ?, status = ?
      WHERE id = ?
    `).run(titulo, autor, genero, totalPaginas, status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    return res.status(200).json({ message: "Livro atualizado com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar livro." });
  }
};

// DELETE - Deletar livro
export const deleteLivro = (req, res) => {
  try {
    const result = db.prepare("DELETE FROM livros WHERE id = ?").run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    return res.status(200).json({ message: "Livro deletado com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar livro." });
  }
};