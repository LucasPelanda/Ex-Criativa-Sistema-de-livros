import { useState } from "react";
import axios from "axios";

function ModalAdicionar(props) {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    genero: "",
    totalPaginas: "",
    status: "Quero Ler",
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

    if (Number(form.totalPaginas) <= 0) {
      setErro("Total de páginas deve ser maior que zero.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/livros", {
        ...form,
        totalPaginas: Number(form.totalPaginas),
      });
      props.aoSalvar();
    } catch (err) {
      setErro("Erro ao adicionar livro.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="bg-teal-800 text-white text-center py-3 rounded-lg mb-4">
          <h2 className="text-lg font-bold">Adicionar Livro</h2>
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
  );
}

export default ModalAdicionar;