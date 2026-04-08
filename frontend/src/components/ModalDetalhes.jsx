import { useState, useEffect } from "react";
import axios from "axios";

function ModalDetalhes(props) {
  const [leituras, setLeituras] = useState([]);
  const [paginasLidas, setPaginasLidas] = useState("");
  const [data, setData] = useState("");
  const [erro, setErro] = useState("");

  async function buscarLeituras() {
    try {
      const res = await axios.get("http://localhost:8800/leituras/" + props.livro.id);
      setLeituras(res.data);
    } catch (err) {
      setErro("Erro ao carregar leituras.");
    }
  }

  useEffect(() => {
    buscarLeituras();
  }, []);

  async function adicionarLeitura() {
    if (!paginasLidas || !data) {
      setErro("Preencha páginas e data.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/leituras", {
        livro_id: props.livro.id,
        paginasLidas: Number(paginasLidas),
        data: data,
      });
      setPaginasLidas("");
      setData("");
      setErro("");
      buscarLeituras();
    } catch (err) {
      setErro("Erro ao adicionar leitura.");
    }
  }

  var totalLido = 0;
  for (var i = 0; i < leituras.length; i++) {
    totalLido = totalLido + leituras[i].paginasLidas;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-screen overflow-y-auto">
        <div className="bg-teal-800 text-white text-center py-3 rounded-lg mb-4">
          <h2 className="text-lg font-bold">{props.livro.titulo}</h2>
        </div>

        <div className="text-sm mb-4">
          <p><strong>Autor:</strong> {props.livro.autor}</p>
          <p><strong>Gênero:</strong> {props.livro.genero}</p>
          <p><strong>Total de páginas:</strong> {props.livro.totalPaginas}</p>
          <p><strong>Páginas lidas:</strong> {totalLido} / {props.livro.totalPaginas}</p>
          <p><strong>Status:</strong> {props.livro.status}</p>
        </div>

        <h3 className="font-bold mb-2">Histórico de Leituras</h3>

        {leituras.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">Nenhuma leitura registrada.</p>
        ) : (
          <ul className="mb-4 text-sm">
            {leituras.map(function(l) {
              return (
                <li key={l.id} className="border-b border-gray-200 py-2">
                  {l.paginasLidas} páginas em {l.data}
                </li>
              );
            })}
          </ul>
        )}

        <h3 className="font-bold mb-2">Adicionar Leitura</h3>

        {erro && (
          <p className="text-red-600 text-sm mb-2">{erro}</p>
        )}

        <div className="flex gap-2 mb-4">
          <input value={paginasLidas} onChange={function(e) { setPaginasLidas(e.target.value) }}
            placeholder="Páginas" type="number"
            className="border-b border-gray-300 p-2 w-1/2 outline-none" />
          <input value={data} onChange={function(e) { setData(e.target.value) }}
            type="date"
            className="border-b border-gray-300 p-2 w-1/2 outline-none" />
        </div>

        <button onClick={adicionarLeitura}
          className="bg-teal-800 text-white px-4 py-2 rounded-lg text-sm w-full mb-4">
          Registrar Leitura
        </button>

        <div className="flex justify-between">
          <button onClick={props.aoFechar}
            className="border border-gray-400 text-gray-600 px-6 py-2 rounded-lg">
            Fechar
          </button>
          <button onClick={function() { props.aoEditar(props.livro) }}
            className="bg-teal-800 text-white px-6 py-2 rounded-lg">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalhes;