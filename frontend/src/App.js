import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import CardLivro from "./components/CardLivro";
import BotaoAdicionar from "./components/BotaoAdicionar";
import ModalAdicionar from "./components/ModalAdicionar";
import ModalDetalhes from "./components/ModalDetalhes";
import ModalEditar from "./components/ModalEditar";


function App() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(null);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const fetchLivros = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/livros`);
      setLivros(res.data);
      setErro("");
    } catch (err) {
      setErro("Erro ao carregar livros.");
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleClickCard = (livro) => {
    setLivroSelecionado(livro);
    setModalAberto("detalhes");
  };

  const handleClickEditar = (livro) => {
    setLivroSelecionado(livro);
    setModalAberto("editar");
  };

  const fecharModal = () => {
    setModalAberto(null);
    setLivroSelecionado(null);
  };

  const salvarEFechar = () => {
    fecharModal();
    fetchLivros();
  };

  return (
    <div className="min-h-screen bg-gray-300 pb-20">
      <Header />

      {erro && (
        <p className="text-center text-red-600 bg-red-100 mx-6 p-3 rounded-lg mb-4">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {livros.map((livro) => (
          <CardLivro
            key={livro.id}
            livro={livro}
            onClickCard={handleClickCard}
            onClickEditar={handleClickEditar}
          />
        ))}
        {modalAberto === "editar" && livroSelecionado && (
        <ModalEditar
          livro={livroSelecionado}
          onFechar={fecharModal}
          onSalvar={salvarEFechar}
        />
      )}
    </div>

      {livros.length === 0 && !erro && (
        <p className="text-center text-gray-600 mt-10 text-lg">
          Nenhum livro cadastrado ainda.
        </p>
      )}

      <BotaoAdicionar onClick={() => setModalAberto("adicionar")} />

      {/* Modais */}
      {modalAberto === "adicionar" && (
        <ModalAdicionar onFechar={fecharModal} onSalvar={salvarEFechar} />
      )}

      {modalAberto === "detalhes" && livroSelecionado && (
        <ModalDetalhes
          livro={livroSelecionado}
          onFechar={fecharModal}
          onEditar={(livro) => {
            setLivroSelecionado(livro);
            setModalAberto("editar");
          }}
        />
      )}
    </div>
  );
}

export default App;