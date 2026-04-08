function BotaoAdicionar(props) {
  return (
    <button
      onClick={props.onClick}
      className="fixed bottom-6 right-6 bg-teal-900 text-white px-6 py-3 rounded-lg font-bold"
    >
      Adicionar Livro
    </button>
  );
}

export default BotaoAdicionar;