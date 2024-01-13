import {  useSelector } from "react-redux";
const Paginado = ({ totalSneaker, page, pageSize, setCurrentPage }) => {
    const sneakers = useSelector((state)=> state?.sneakers)
   
    const nextHandler = () => {
      if (page < totalSneaker/ pageSize ) {
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
        <button onClick={prevHandler} disabled={page === 0}>
          Prev
        </button>
        <span style={{ color: 'black' }}>
          Página: {page} de {Math.ceil(totalSneaker / pageSize)}
        </span>
        <button onClick={nextHandler} disabled={page === totalSneaker -1 }>
          Next
        </button>
      </div>
    );
  };

export default Paginado;