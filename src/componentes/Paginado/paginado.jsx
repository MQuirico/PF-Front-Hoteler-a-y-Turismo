import React from 'react';
import './paginado.css';

const Pagination = ({ currentPage, totalPages, onPageClick, isSearchResult }) => {
  const pagesToShow = 5; 
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  
  let startPage, endPage;
  if (totalPages <= pagesToShow) {
  
    startPage = 1;
    endPage = totalPages;
  } else {

    // Calcula las páginas de inicio y fin para que la página actual esté centrada
    
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    startPage = Math.max(1, currentPage - halfPagesToShow);
    endPage = startPage + pagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
  }

  const isSingleResult = totalPages === 1 && currentPage === 1 && isSearchResult;

  return (
    <div className="pagesContainer">
      <div>
        {!isSingleResult && (
          <button
            onClick={() => onPageClick(1)}
            className="sideButton"
            disabled={currentPage === 1}
          >
            ≪
          </button>
        )}
        {!isSingleResult && currentPage !== 1 && !isSearchResult && (
          <button className="stepButton" onClick={() => onPageClick(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
        )}
      </div>

      <div>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage).map(page => (
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
          <button className="stepButton" onClick={() => onPageClick(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        )}
        {!isSingleResult && (
          <button
            onClick={() => onPageClick(totalPages)}
            className="sideButton"
            disabled={currentPage === totalPages}
          >
            ≫
          </button>
        )}
      </div>
      <div className="spanPages">
        <span>{`${currentPage} / ${totalPages}`}</span>
      </div>
    </div>
  );
};

export default Pagination;