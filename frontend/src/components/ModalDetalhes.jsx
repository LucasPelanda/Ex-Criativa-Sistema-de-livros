import { useState, useEffect } from "react";
import axios from "axios";


const ModalDetalhes = ({ livro, onFechar, onEditar }) => {
  const [leituras, setLeituras] = useState([]);
  const [paginasLidas, setPaginasLidas] = useState("");
  const [data, setData] = useState("");
  const [erro, setErro] = useState("");

  const fetchLeituras = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/leituras/${livro.id}`);
      setLeituras(res.data);
    } catch (err) {
      setErro("Erro ao carregar leituras.");
    }
  };

  useEffect(() => {
    fetchLeituras();
  }, []);

  const handleAdicionarLeitura = async () => {
    if (!paginasLidas || !data) {
      setErro("Preencha páginas e data.");
      return;
    }

    try {
      await axios.post(`http://localhost:8800/leituras`, {
        livro_id: livro.id,
        paginasLidas: Number(paginasLidas),
        data: data,
      });
      setPaginasLidas("");
      setData("");
      setErro("");
      fetchLeituras();
    } catch (err) {
      setErro("Erro ao adicionar leitura.");
    }
  };

  const totalLido = leituras.reduce((acc, l) => acc + l.paginasLidas, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-screen overflow-y-auto">
        {/* Cabeçalho */}
        <div className="bg-teal-800 text-white text-center py-3 rounded-lg mb-4">
          <h2 className="text-lg font-bold">{livro.titulo}</h2>
        </div>

        {/* Infos do livro */}
        <div className="text-sm mb-4">
          <p><strong>Autor:</strong> {livro.autor}</p>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>Total de páginas:</strong> {livro.totalPaginas}</p>
          <p><strong>Páginas lidas:</strong> {totalLido} / {livro.totalPaginas}</p>
          <p><strong>Status:</strong> {livro.status}</p>
        </div>

        {/* Histórico de leituras */}
        <h3 className="font-bold mb-2">Histórico de Leituras</h3>

        {leituras.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">Nenhuma leitura registrada.</p>
        ) : (
          <ul className="mb-4 text-sm">
            {leituras.map((l) => (
              <li key={l.id} className="border-b border-gray-200 py-2">
                {l.paginasLidas} páginas em {l.data}
              </li>
            ))}
          </ul>
        )}

        {/* Adicionar leitura */}
        <h3 className="font-bold mb-2">Adicionar Leitura</h3>

        {erro && (
          <p className="text-red-600 text-sm mb-2">{erro}</p>
        )}

        <div className="flex gap-2 mb-4">
          <input
            value={paginasLidas}
            onChange={(e) => setPaginasLidas(e.target.value)}
            placeholder="Páginas"
            type="number"
            className="border-b border-gray-300 p-2 w-1/2 outline-none"
          />
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="date"
            className="border-b border-gray-300 p-2 w-1/2 outline-none"
          />
        </div>

        <button
          onClick={handleAdicionarLeitura}
          className="bg-teal-800 text-white px-4 py-2 rounded-lg text-sm w-full mb-4"
        >
          Registrar Leitura
        </button>

        {/* Botões */}
        <div className="flex justify-between">
          <button
            onClick={onFechar}
            className="border border-gray-400 text-gray-600 px-6 py-2 rounded-lg"
          >
            Fechar
          </button>
          <button
            onClick={() => onEditar(livro)}
            className="bg-teal-800 text-white px-6 py-2 rounded-lg"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhes;