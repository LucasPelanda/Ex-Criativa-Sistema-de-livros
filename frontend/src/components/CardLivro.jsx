const CardLivro = ({ livro, onClickCard, onClickEditar }) => {
  return (
    <div
      onClick={() => onClickCard(livro)}
      className="bg-teal-800 text-white rounded-lg p-4 cursor-pointer relative"
    >
      {/* Botão 3 pontinhos */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClickEditar(livro);
        }}
        className="absolute top-2 right-3 text-xl"
      >
        ⋮
      </button>

      <h2 className="text-lg font-bold mb-3">{livro.titulo}</h2>

      <div className="flex gap-4">
        <div className="w-16 h-20 bg-white rounded-lg"> </div>

        {/* Informações */}
        <div className="text-sm">
          <p><span className="text-teal-300">autor</span><br />{livro.autor}</p>
          <div className="flex gap-4 mt-1">
            <p><span className="text-teal-300">gênero</span><br />{livro.genero}</p>
            <p><span className="text-teal-300">total de páginas</span><br />{livro.totalPaginas}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-3">
        <span className=" text-xs px-3 py-1 rounded">
          páginas lidas: {livro.paginasLidas}
        </span>
        <span className=" text-xs px-3 py-1 rounded">
          Status: {livro.status}
        </span>
      </div>
    </div>
  );
};

export default CardLivro;