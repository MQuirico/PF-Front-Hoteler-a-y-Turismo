import React from 'react';
import './paginado.css';

const Pagination = ({ currentPage, totalPages, onPageClick, isSearchResult }) => {
  const pagesToShow =  5; // Número de páginas a mostrar en el paginador
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index +  1);

  // Calcula las páginas a mostrar en el paginador actual
  let startPage, endPage;
  if (totalPages <= pagesToShow) {
    // Si hay menos páginas totales que las páginas a mostrar, mostrar todas las páginas
    startPage =  1;
    endPage = totalPages;
  } else {
    // Calcula las páginas de inicio y fin para que la página actual esté centrada
    const halfPagesToShow = Math.floor(pagesToShow /  2);
    startPage = Math.max(1, currentPage - halfPagesToShow);
    endPage = startPage + pagesToShow -  1;
    // Si las páginas calculadas sobrepasan el límite, ajusta startPage y endPage
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow +  1);
    }
  }

  const isSingleResult = totalPages ===  1 && currentPage ===  1 && isSearchResult;

  return (
    <div className="pagesContainer">


      <div>
        {Array.from({ length: endPage - startPage +  1 }, (_, index) => index + startPage).map(page => (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className={`${"pageButton"} ${page === currentPage ? "active" : ''}`}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="btns">
        {!isSingleResult && currentPage !== totalPages && !isSearchResult && (
          <button className="stepButton" onClick={() => onPageClick(currentPage +  1)} disabled={currentPage === totalPages}>
            Next
          </button>
        )}

      </div>

    </div>
  );
};

export default Pagination;