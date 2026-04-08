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

  async function buscarLivros() {
    try {
      const res = await axios.get("http://localhost:8800/livros");
      setLivros(res.data);
      setErro("");
    } catch (err) {
      setErro("Erro ao carregar livros.");
    }
  }

  useEffect(function() {
    buscarLivros();
  }, []);

  function clicarCard(livro) {
    setLivroSelecionado(livro);
    setModalAberto("detalhes");
  }

  function clicarEditar(livro) {
    setLivroSelecionado(livro);
    setModalAberto("editar");
  }

  function fecharModal() {
    setModalAberto(null);
    setLivroSelecionado(null);
  }

  function salvarEFechar() {
    fecharModal();
    buscarLivros();
  }

  return (
    <div className="min-h-screen bg-gray-300 pb-20">
      <Header />

      {erro && (
        <p className="text-center text-red-600 bg-red-100 mx-6 p-3 rounded-lg mb-4">
          {erro}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {livros.map(function(livro) {
          return (
            <CardLivro
              key={livro.id}
              livro={livro}
              clicarCard={clicarCard}
              clicarEditar={clicarEditar}
            />
          );
        })}
      </div>

      {livros.length === 0 && !erro && (
        <p className="text-center text-gray-600 mt-10 text-lg">
          Nenhum livro cadastrado ainda.
        </p>
      )}

      <BotaoAdicionar onClick={function() { setModalAberto("adicionar") }} />

      {modalAberto === "adicionar" && (
        <ModalAdicionar aoFechar={fecharModal} aoSalvar={salvarEFechar} />
      )}

      {modalAberto === "detalhes" && livroSelecionado && (
        <ModalDetalhes
          livro={livroSelecionado}
          aoFechar={fecharModal}
          aoEditar={function(livro) {
            setLivroSelecionado(livro);
            setModalAberto("editar");
          }}
        />
      )}

      {modalAberto === "editar" && livroSelecionado && (
        <ModalEditar
          livro={livroSelecionado}
          aoFechar={fecharModal}
          aoSalvar={salvarEFechar}
        />
      )}
    </div>
  );
}

export default App;