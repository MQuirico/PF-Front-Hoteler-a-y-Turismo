import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Actions/actions";
import style from "./filter.module.css";
import debounce from "lodash/debounce";
import { TextField, IconButton, MenuItem } from "@mui/material";
import { LocationOn, Pool, Sort } from "@mui/icons-material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchBar from "../SearchBar/searchBar";
import Cards from "../../componentes/Cards/cards";
import { useHistory, useLocation } from 'react-router-dom';





function Filter({ applyFilters }) {
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedPileta, setSelectedPileta] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = useSelector((state) => state.stateA.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const products = useSelector((state) => state.stateA.products);
  const cardsPerPage = 8;
  const dispatch = useDispatch();
  const history = useHistory();
  const [notificationClosed, setNotificationClosed] = useState(false); 
  const location = useLocation();
 const locationState = location.state;
 const selectedLocationInfo = locationState && locationState.selectedLocation ? locationState : null;

 useEffect(() => {
  console.log('Filter component mounted');
  console.log('Location state:', location.state);
  if (selectedLocationInfo && !notificationClosed) {
    setNotificationClosed(false); // Asegurarse de que la notificación se muestre
  }
}, [selectedLocationInfo, notificationClosed]);

   console.log('selectedLocationInfo:', selectedLocationInfo);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
    setCurrentPage(1);
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm.trim()))
        .then((response) => {
          if (response.status === 400) {
            setError(true);
          } else {
            setError(false);
          }
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setError(false);
      dispatch(fetchProducts({}, 1, cardsPerPage));
    }
  };

  const handleFilterChange = debounce((filters) => {
    dispatch(fetchProducts({ ...filters, page: 1, pageSize }));
    setIsSearchResult(true);
  }, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    setError(searchResults?.length === 0 && searchTerm.trim() !== "");
  }, [searchResults, searchTerm]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts({}, page, cardsPerPage));
  };

  const applyAndHandleFilterChange = (filters) => {
    handleFilterChange(filters);
    applyFilters(filters);
  };

  const handleFilterTemporada = (value) => {
    setSelectedTemporada(value);
    const filters = { temporada: value, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleFilterLocalidad = (value) => {
    setSelectedLocalidad(value);
    const filters = { temporada: selectedTemporada, localidad: value, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleFilterPileta = (value) => {
    setSelectedPileta(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: value, orderPrice };
    applyAndHandleFilterChange(filters);
  };

  const handleOrderPriceChange = (value) => {
    setOrderPrice(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice: value };
    applyAndHandleFilterChange(filters);
  };



  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <TextField
          select
          value={selectedTemporada}
          onChange={(e) => handleFilterTemporada(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <WbSunnyIcon  /> Temporada
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Temporada</MenuItem>
          <MenuItem value="Verano">Verano</MenuItem>
          <MenuItem value="Invierno">Invierno</MenuItem>
          <MenuItem value="Otoño">Otoño</MenuItem>
          <MenuItem value="Primavera">Primavera</MenuItem>
        </TextField>

        <TextField
          select
          value={selectedLocalidad}
          onChange={(e) => handleFilterLocalidad(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <LocationOn /> Localidad
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Localidad</MenuItem>
          {/* Añade las opciones de localidad aquí */}
        </TextField>

        <TextField
          select
          value={selectedPileta}
          onChange={(e) => handleFilterPileta(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Pool />
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Pileta</MenuItem>
          <MenuItem value="si">Sí</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>

        <TextField
          select
          value={orderPrice}
          onChange={(e) => handleOrderPriceChange(e.target.value)}
          className={style.select}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Sort /> Precio
              </IconButton>
            ),
          }}
        >
          <MenuItem value="">Ordenar por precio</MenuItem>
          <MenuItem value="asc">Menor a mayor</MenuItem>
          <MenuItem value="desc">Mayor a menor</MenuItem>
        </TextField>
        
        <div className={style.search}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div>
      
      {selectedLocationInfo && !notificationClosed && (
        <div className={style.notification}>
          <p style={{color:"black"}}>
          
        Aquí podrás seleccionar el filtrado para la localidad: 
        <span className={style.colorlocalidad}>{selectedLocationInfo.selectedLocation}</span> 
        que se seleccionó en el ranking n° 
        <span className={style.colorlocalidad}>{selectedLocationInfo.rankingNumber}</span>.
      
          </p>
          <button className={style.closeButton}
           onClick={() => setNotificationClosed(true)}>X</button>
        </div>
      )}
      
      </div>
      <div className="cardsRows">
        <Cards products={searchTerm.trim() !== "" ? searchResults : products} />
      </div>
    </div>
  );
}

export default Filter;