
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
  const page = useSelector((state) => state?.currentPage);
  const brand = useSelector((state) => state?.brandValue);
  const [selectedBrand, setSelectedBrand] = useState('');
  const pageSize = 3;

  const setCurrentPage = (page) => {
    {
      dispatch(getSneakers(page,pageSize,brand));
    }
  };

  

  return (
    <div>
      <Filter totalSneaker={totalSneaker} page={page} pageSize={pageSize} setCurrentPage={setCurrentPage}  ></Filter>
      <SearchBar />
      <Paginado totalSneaker={totalSneaker} page={page} pageSize={pageSize} setCurrentPage={setCurrentPage}/>
      <Cards  sneakers={sneakers} />
      {sneakers.length === 0 && <p>No se encontraron países o actividades. ¡Intenta con diferentes filtros!</p>}
    </div>
  );
};

export default Home;

