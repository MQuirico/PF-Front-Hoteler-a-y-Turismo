import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react'
import { getSneakers,searchBar } from "../../redux/actions/actions";
import Cards from "../../componentes/Cards/cards";
import Paginado from '../../componentes/Paginado/Paginado';
import styles from './Home.module.css';
import Filter from '../../componentes/Filter/filter';
import SearchBar from '../../componentes/SearchBar/searchBar';

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state?.sneakers);
  const totalSneaker = useSelector((state) => state?.totalSneaker);
  const currentPage = useSelector((state) => state?.currentPage);
  const currentPageSearch = useSelector((state) => state?.page);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchState = useSelector((state) => state?.dataSearch); //  estado para los resultados de la búsqueda
  const pageSize = 4;
console.log(searchState)
console.log(price)
  useEffect(() => {
    if(searchState && searchState.length > 0){
      dispatch(searchBar(searchState,currentPageSearch, pageSize,price ));
    } else {
    dispatch(getSneakers(currentPage, pageSize, brand, color, size, price));
}}, [dispatch]);

  const setCurrentPage = (page) => {
    if(searchState && searchState.length > 0){
      dispatch(searchBar( searchState ,page, pageSize,price));
    } else {
    dispatch(getSneakers(page, pageSize, brand, color, size, price));}
  };

  

  console.log(currentPageSearch)

  return (
    <div className={styles.container}>
      <div className={styles.filterComponent}>
      <SearchBar totalSneaker={totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}></SearchBar>
      <Filter totalSneaker={searchState ? searchState.length : totalSneaker} page={currentPageSearch >= 1 ?currentPageSearch: currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}></Filter>
      </div>
      <div className={styles.cardsComponent}>
      <Cards sneakers={ sneakers  } />
      {(sneakers && sneakers.length === 0) && <p>No se encontraron resultados. ¡Intenta con diferentes filtros!</p>}
      </div>
      <div className={styles.paginatedComponent}>
      <Paginado totalSneaker={totalSneaker} page={currentPageSearch >= 1 ?currentPageSearch: currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}/>
    </div>
    </div>
  );
};

export default Home;