import { useState } from "react";
import axios from "axios";

function ModalEditar(props) {
  const [form, setForm] = useState({
    titulo: props.livro.titulo,
    autor: props.livro.autor,
    genero: props.livro.genero,
    totalPaginas: props.livro.totalPaginas,
    status: props.livro.status,
  });
  const [erro, setErro] = useState("");

  function Escrita(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function Salvar() {
    if (!form.titulo || !form.autor || !form.genero || !form.totalPaginas) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      await axios.put("http://localhost:8800/livros/" + props.livro.id, {
        ...form,
        totalPaginas: Number(form.totalPaginas),
      });
      props.aoSalvar();
    } catch (err) {
      setErro("Erro ao atualizar livro.");
    }
  }

  async function Deletar() {
    if (window.confirm("Tem certeza que deseja deletar este livro?")) {
      try {
        await axios.delete("http://localhost:8800/livros/" + props.livro.id);
        props.aoSalvar();
      } catch (err) {
        setErro("Erro ao deletar livro.");
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="bg-teal-800 text-white text-center py-3 rounded-lg mb-4">
          <h2 className="text-lg font-bold">Editar Livro</h2>
        </div>

        {erro && (
          <p className="text-red-600 text-sm text-center mb-3">{erro}</p>
        )}

        <input name="titulo" value={form.titulo} onChange={Escrita} placeholder="Título"
          className="w-full border-b border-gray-300 p-2 mb-3 outline-none" />

        <input name="autor" value={form.autor} onChange={Escrita} placeholder="Autor"
          className="w-full border-b border-gray-300 p-2 mb-3 outline-none" />

        <input name="genero" value={form.genero} onChange={Escrita} placeholder="Gênero"
          className="w-full border-b border-gray-300 p-2 mb-3 outline-none" />

        <input name="totalPaginas" value={form.totalPaginas} onChange={Escrita} placeholder="Número de páginas" type="number"
          className="w-full border-b border-gray-300 p-2 mb-3 outline-none" />
          
        <select name="status" value={form.status} onChange={Escrita}
          className="w-full border-b border-gray-300 p-2 mb-6 outline-none">
          <option value="Quero Ler">Quero Ler</option>
          <option value="Lendo">Lendo</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <div className="flex justify-between">
          <button onClick={Deletar}
            className="border border-red-500 text-red-500 px-6 py-2 rounded-lg">
            Deletar
          </button>
          <div className="flex gap-2">
            <button onClick={props.aoFechar}
              className="border border-gray-400 text-gray-600 px-6 py-2 rounded-lg">
              Cancelar
            </button>
            <button onClick={Salvar}
              className="bg-teal-800 text-white px-6 py-2 rounded-lg font-bold">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditar;