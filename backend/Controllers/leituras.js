import db from "../db.js";

// GET - Listar leituras de um livro
export const getLeituras = (req, res) => {
  try {
    const livro = db.prepare("SELECT id FROM livros WHERE id = ?").get(req.params.livroId);

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    const leituras = db.prepare(`
      SELECT * FROM leituras 
      WHERE livro_id = ? 
      ORDER BY data DESC
    `).all(req.params.livroId);

    return res.status(200).json(leituras);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar leituras." });
  }
};

// POST - Adicionar nova leitura
export const createLeitura = (req, res) => {
  const { livro_id, paginasLidas, data } = req.body;

  // Validações
  if (!livro_id || !paginasLidas || !data) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (paginasLidas <= 0) {
    return res.status(400).json({ error: "Páginas lidas deve ser um número positivo." });
  }

  try {
    const livro = db.prepare("SELECT id FROM livros WHERE id = ?").get(livro_id);

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    const result = db.prepare(`
      INSERT INTO leituras (livro_id, paginasLidas, data)
      VALUES (?, ?, ?)
    `).run(livro_id, paginasLidas, data);

    return res.status(201).json({ id: result.lastInsertRowid, message: "Leitura adicionada com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao adicionar leitura." });
  }
};