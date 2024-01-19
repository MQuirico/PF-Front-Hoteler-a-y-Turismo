import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react'
import { getSneakers } from "../../redux/actions/actions";
import Cards from "../../componentes/Cards/cards";
import Paginado from '../../componentes/Paginado/Paginado';
import styles from './Home.module.css';
import Filter from '../../componentes/Filter/filter';
import Alert from '../../componentes/Alert/Alert'; // Importa el componente de Alert


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
  const pageSize = 8;

  const setCurrentPage = (page) => {
    dispatch(getSneakers(page, pageSize, brand, color, size, price));
  };

  useEffect(() => {
    dispatch(getSneakers(1, pageSize, brand, color, size, price));
   }, []);


  return (
    <div className={styles.container}>
      <div className={styles.paginatedContainer}>
      <Paginado totalSneaker={searchState ? searchState.length : totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage} />
      </div>
      <div className={styles.filterComponent}>
      <Filter totalSneaker={totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}/>
      </div>
      <div className={styles.cardsComponent}>
        {(sneakers && sneakers.length === 0) &&  
          <Alert message="No se encontraron resultados. ¡Intenta con diferentes filtros!" />
        }
        {<Cards sneakers={searchState || sneakers} />}
      </div>
      <div className={styles.paginatedComponent}>
    </div>
    </div>
  );
};

export default Home;