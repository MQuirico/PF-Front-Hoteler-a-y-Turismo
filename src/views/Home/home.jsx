import { useDispatch, useSelector } from 'react-redux';
import { getSneakers } from "../../redux/actions/actions";
import Cards from "../../componentes/Cards/cards";
import SearchBar from "../../componentes/SearchBar/searchBar";
import Paginado from '../../componentes/Paginado/paginado';
import Filter from '../../componentes/Filter/filter';

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state?.sneakers);
  const totalSneaker = useSelector((state) => state?.totalSneaker);
  const currentPage = useSelector((state) => state?.currentPage);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchState = useSelector((state) => state?.data); //  estado para los resultados de la búsqueda
  const pageSize = 3;

  const setCurrentPage = (page) => {
    dispatch(getSneakers(page, pageSize, brand, color, size, price));
  };

  return (
    <div>
      <Filter totalSneaker={totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}></Filter>
      <SearchBar />
      <Paginado totalSneaker={searchState ? searchState.length : totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage} />
      <Cards sneakers={searchState || sneakers} /> {/* Utiliza los resultados de la búsqueda si existen */}
      {(sneakers && sneakers.length === 0) && <p>No se encontraron países o actividades. ¡Intenta con diferentes filtros!</p>}
    </div>
  );
};

export default Home;