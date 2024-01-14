
const Paginado = ({ totalSneaker, page, pageSize, setCurrentPage }) => {
    console.log("Page in paginado:", page);
    
    const nextHandler = () => {
      if (page <= totalSneaker/ pageSize ) {
        setCurrentPage(page + 1);
      }
    };
  
    const prevHandler = () => {
      if (page > 1) {
        setCurrentPage(page - 1);
      }
    };
    
  
    return (
      <div>
        <button onClick={prevHandler} disabled={page <= 1}>
            Prev
        </button>
        <span style={{ color: 'black' }}>
          Página: {page} de {Math.ceil(totalSneaker / pageSize)}
        </span>
        <button onClick={nextHandler} disabled={page >= Math.ceil(totalSneaker / pageSize)}>
            Next    
        </button>
      </div>
    );
  };

export default Paginado;