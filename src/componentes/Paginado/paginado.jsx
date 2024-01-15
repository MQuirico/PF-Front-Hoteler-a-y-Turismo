import style from "../Paginado/Paginado.module.css"

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
      <div className={style.container}>
        <div>
          <button onClick={prevHandler} disabled={page <= 1} className={style.buttons}>
              Prev
          </button>
          <span style={{ color: 'white' }}>
            Page {page} of {Math.ceil(totalSneaker / pageSize)}
          </span>
          <button onClick={nextHandler} className={style.buttons} disabled={page >= Math.ceil(totalSneaker / pageSize)}>
              Next    
          </button>
        </div>
      </div>
    );
  };

export default Paginado;