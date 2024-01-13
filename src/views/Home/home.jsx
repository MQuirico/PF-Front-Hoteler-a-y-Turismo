
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getSneakers,filterProducts} from "../../redux/actions/actions"
import Cards from "../../componentes/Cards/cards";
import SearchBar from "../../componentes/SearchBar/searchBar";
import Paginado from '../../componentes/Paginado/paginado';
import Filter from '../../componentes/Filter/filter';

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state?.sneakers);
  const totalSneaker = useSelector((state) => state?.totalSneaker);
  const filter = useSelector((state)=>state?.filterProducts)
  const page = useSelector((state) => state?.currentPage);
  const pageSize = 4;

  const setCurrentPage = (page) => {
    {
      dispatch(getSneakers(page));
    }

    // Aquí deberías dispatch una acción para actualizar currentPage en el store
    // Ejemplo: dispatch(setCurrentPageAction(page));
  };

  useEffect(() => {
    dispatch(getSneakers(page, pageSize));
  }, [dispatch, page, pageSize]);


  return (
    <div>
      <Filter totalSneaker={totalSneaker} page={page} pageSize={pageSize} setCurrentPage={setCurrentPage} ></Filter>
      <SearchBar />
      <Paginado totalSneaker={totalSneaker} page={page} pageSize={pageSize} setCurrentPage={setCurrentPage}/>
      <Cards  sneakers={filter ? filter : sneakers} />
      {sneakers.length === 0 && <p>No se encontraron países o actividades. ¡Intenta con diferentes filtros!</p>}
    </div>
  );
};

export default Home;

//dsadsadsadsadsadsadsadsdsadad

//holaasdasdasdasdsadada
//sdad
