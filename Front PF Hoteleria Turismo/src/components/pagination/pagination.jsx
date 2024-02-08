import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage, onPageClick, isSearchResult }) => {

  const pageRange = 5; // Número de páginas a mostrar a la vez
  const pageNumb = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Calcula las páginas a mostrar en la paginación actual
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  // Filtra las páginas a mostrar
  const visiblePages = pageNumb.slice(startPage - 1, endPage);

  const isSingleResult = totalPages === 1 && currentPage === 1 && isSearchResult;

  return (
    <div className={style.pagesContainer}>
      <div>
        {!isSingleResult && (
          <button
            onClick={() => onPageClick(1)}
            className={style.sideButton}
            disabled={currentPage === 1}
          >
            ≪
          </button>
        )}
        {!isSingleResult && currentPage !== 1 && !isSearchResult && (
          <button className={style.stepButton} onClick={onPrevPage} disabled={currentPage === 1}>
            Prev
          </button>
        )}
      </div>

      <div>
        {isSearchResult ? (
          <button
            key={1}
            onClick={() => onPageClick(1)}
            className={style.pageButton}
            disabled={currentPage === 1}
          >
            1
          </button>
        ) : (
          visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageClick(page)}
              className={`${style.pageButton} ${page === currentPage ? style.active : ''}`}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))
        )}
      </div>

      <div className={style.btns}>
        {!isSingleResult && currentPage !== totalPages && !isSearchResult && (
          <button className={style.stepButton} onClick={onNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        )}
        {!isSingleResult && (
          <button
            onClick={() => onPageClick(25)}
            className={style.sideButton}
            disabled={currentPage === 25}
          >
            ≫
          </button>
        )}
      </div>
      <div className={style.spanPages}>
        <span>{`${currentPage} / ${totalPages}`}</span>
      </div>
    </div>
  );
};

export default Pagination;