import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Actions/actions";
import style from "./filter.module.css";
import debounce from "lodash/debounce";
import { TextField, IconButton, MenuItem } from "@mui/material";
import {   LocationOn, Pool, Sort } from "@mui/icons-material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchBar from "../SearchBar/searchBar"

function Filter({ onPageChange, applyFilters }) {
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedPileta, setSelectedPileta] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [pageSize, setPageSize] = useState(5); 
  const [isSearchResult, setIsSearchResult] = useState(false);

  const dispatch = useDispatch();

  const handleFilterChange = useCallback(
    debounce((filters) => {
      dispatch(fetchProducts({ ...filters, page: 1, pageSize }));
      setIsSearchResult(true);
    }, 300),
    [dispatch, pageSize]
  );

  const applyAndHandleFilterChange = useCallback((filters) => {
    handleFilterChange(filters);
    applyFilters(filters);
  }, [handleFilterChange, applyFilters]);

  const handleFilterTemporada = useCallback((value) => {
    setSelectedTemporada(value);
    const filters = { temporada: value, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  }, [applyAndHandleFilterChange, selectedLocalidad, selectedPileta, orderPrice]);

  const handleFilterLocalidad = useCallback((value) => {
    setSelectedLocalidad(value);
    const filters = { temporada: selectedTemporada, localidad: value, pileta: selectedPileta, orderPrice };
    applyAndHandleFilterChange(filters);
  }, [applyAndHandleFilterChange, selectedTemporada, selectedPileta, orderPrice]);

  const handleFilterPileta = useCallback((value) => {
    setSelectedPileta(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: value, orderPrice };
    applyAndHandleFilterChange(filters);
  }, [applyAndHandleFilterChange, selectedTemporada, selectedLocalidad, orderPrice]);

  const handleOrderPriceChange = useCallback((value) => {
    setOrderPrice(value);
    const filters = { temporada: selectedTemporada, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice: value };
    applyAndHandleFilterChange(filters);
  }, [applyAndHandleFilterChange, selectedTemporada, selectedLocalidad, selectedPileta]);

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
          <MenuItem value="El Bolsón, Provincia de Río Negro">El Bolsón, Provincia de Río Negro</MenuItem>
          {/* Otras opciones de localidades */}
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
      <SearchBar/>
        </div>
      </div>
    </div>
  );
}

export default Filter;