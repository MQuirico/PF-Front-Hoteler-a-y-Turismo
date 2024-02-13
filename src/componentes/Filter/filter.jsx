import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Actions/actions";
import style from "./Filter.module.css";
import debounce from "lodash/debounce";

function Filter({ onPageChange }) {
  const [selectedTemporada, setSelectedTemporada] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedPileta, setSelectedPileta] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [page, setPage] = useState(1); 
  const [pageSize, setPageSize] = useState(5); 

  const dispatch = useDispatch();



  
  const handleFilterChange = useCallback(
    debounce((filters) => {
      dispatch(fetchProducts({ ...filters, page, pageSize }));
    }, 300), // Tiempo de espera en milisegundos
    [dispatch, page, pageSize]
  );
  
  const handleFilterTemporada = useCallback((value) => {
    setSelectedTemporada(value);
    handleFilterChange({ temporada: value, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice });
  }, [handleFilterChange, selectedLocalidad, selectedPileta, orderPrice]);
  
  
  const handleFilterLocalidad = useCallback((value) => {
    setSelectedLocalidad(value);
    handleFilterChange({ temporada: selectedTemporada, localidad: value, pileta: selectedPileta, orderPrice });
  }, [handleFilterChange, selectedTemporada, selectedPileta, orderPrice]);
  
  
  const handleFilterPileta = useCallback((value) => {
    setSelectedPileta(value);
    handleFilterChange({ temporada: selectedTemporada, localidad: selectedLocalidad, pileta: value, orderPrice });
  }, [handleFilterChange, selectedTemporada, selectedLocalidad, orderPrice]);
  
  
  const handleOrderPriceChange = useCallback((value) => {
    setOrderPrice(value);
    handleFilterChange({ temporada: selectedTemporada, localidad: selectedLocalidad, pileta: selectedPileta, orderPrice: value });
  }, [handleFilterChange, selectedTemporada, selectedLocalidad, selectedPileta]);
  
  
  
  return (
    <div className={style.containerContent}>
      <div className={style.container}>
      <select
  name="FilterTemporada"
  value={selectedTemporada}
  onChange={(e) => handleFilterTemporada(e.target.value)}
  className={style.select}
>
  <option value="">Temporada</option>
  <option value="Verano">Verano</option>
  <option value="Invierno">Invierno</option>
  <option value="Otoño">Otoño</option>
  <option value="Primavera">Primavera</option>
</select>

        <select
          name="FilterLocalidad"
          value={selectedLocalidad}
          onChange={(e) => handleFilterLocalidad(e.target.value)}
          className={style.select}
        >
          <option value="">Localidad</option>
          <option value="El Bolsón, Provincia de Río Negro">El Bolsón, Provincia de Río Negro</option>
          <option value="Villa Pehuenia, Provincia de Neuquén">Villa Pehuenia, Provincia de Neuquén</option>
          <option value='Purmamarca, Provincia de Jujuy'>Purmamarca, Provincia de Jujuy</option>
          <option value='Villa Traful, Provincia de Neuquén'>Villa Traful, Provincia de Neuquén</option>
          <option value="Las Grutas, Provincia de Río Negro">Las Grutas, Provincia de Río Negro</option>
          <option value="San Javier, Provincia de Tucumán">San Javier, Provincia de Tucumán</option>
          <option value="Los Reartes, Provincia de Córdoba">Los Reartes, Provincia de Córdoba</option>
          <option value="Caviahue, Provincia de Neuquén">Caviahue, Provincia de Neuquén</option>
          <option value="Tafí del Valle, Provincia de Tucumán">Tafí del Valle, Provincia de Tucumán</option>
          <option value="Villa Meliquina, Provincia de Neuquén">Villa Meliquina, Provincia de Neuquén</option>
          <option value="San Marcos Sierras, Provincia de Córdoba">San Marcos Sierras, Provincia de Córdoba</option>
          <option value="Cuesta Blanca, Provincia de Córdoba">Cuesta Blanca, Provincia de Córdoba</option>
          <option value="El Soberbio, Provincia de Misiones">El Soberbio, Provincia de Misiones</option>
          <option value="Villa General Roca, Provincia de Córdoba">Villa General Roca, Provincia de Córdoba</option>
          <option value="Colonia Suiza, Provincia de Río Negro">Colonia Suiza, Provincia de Río Negro</option>
          <option value="San Antonio de los Cobres, Provincia de Salta">San Antonio de los Cobres, Provincia de Salta</option>
          <option value="Tilcara, Provincia de Jujuy">Tilcara, Provincia de Jujuy</option>
          <option value="El Condor, Provincia de Río Negro">El Condor, Provincia de Río Negro</option>
          <option value="Villa Yacanto, Provincia de Córdoba">Villa Yacanto, Provincia de Córdoba</option>
          <option value="Cholila, Provincia de Chubut">Cholila, Provincia de Chubut</option>
          <option value="Villa La Angostura, Provincia de Neuquén">Villa La Angostura, Provincia de Neuquén</option>
          <option value="Santa Ana, Provincia de Misiones">Santa Ana, Provincia de Misiones</option>
          <option value="Las Rabonas, Provincia de Córdoba">Las Rabonas, Provincia de Córdoba</option>
          <option value="Yavi, Provincia de Jujuy">Yavi, Provincia de Jujuy</option>
          <option value="Villa Ciudad Parque Los Reartes, Provincia de Córdoba">Villa Ciudad Parque Los Reartes, Provincia de Córdoba</option>
          <option value="Villa Cura Brochero, Provincia de Córdoba">Villa Cura Brochero, Provincia de Córdoba</option>
          <option value="Villa Berna, Provincia de Córdoba">Villa Berna, Provincia de Córdoba</option>
          <option value="Los Molles, Provincia de San Luis">Los Molles, Provincia de San Luis</option>
          <option value="Los Alerces, Provincia de Chubut">Los Alerces, Provincia de Chubut</option>
          <option value="Nono, Provincia de Córdoba">Nono, Provincia de Córdoba</option>
          <option value="Lago Puelo, Provincia de Chubut">Lago Puelo, Provincia de Chubut</option>
          <option value="La Cumbrecita, Provincia de Córdoba">La Cumbrecita, Provincia de Córdoba</option>
          <option value="San Pedro de Colalao, Provincia de Tucumán">San Pedro de Colalao, Provincia de Tucumán</option>
          <option value="Villa Lago Meliquina, Provincia de Neuquén">Villa Lago Meliquina, Provincia de Neuquén</option>
          <option value="Los Hornillos, Provincia de Córdoba">Los Hornillos, Provincia de Córdoba</option>
          <option value="Villa Quila Quina, Provincia de Neuquén">Villa Quila Quina, Provincia de Neuquén</option>
          <option value="Capilla del Monte, Provincia de Córdoba">Capilla del Monte, Provincia de Córdoba</option>
          <option value="El Chocón, Provincia de Neuquén">El Chocón, Provincia de Neuquén</option>
          <option value="Maimará, Provincia de Jujuy">Maimará, Provincia de Jujuy</option>
          <option value="Miramar, Provincia de Córdoba">Miramar, Provincia de Córdoba</option>
          <option value="El Mollar, Provincia de Tucumán">El Mollar, Provincia de Tucumán</option>
          <option value="El Hoyo, Provincia de Chubut">El Hoyo, Provincia de Chubut</option>
          <option value="Yacanto de Calamuchita, Provincia de Córdoba">Yacanto de Calamuchita, Provincia de Córdoba</option>
          <option value="San Roque, Provincia de Córdoba">San Roque, Provincia de Córdoba</option>
          <option value="Villa de Las Rosas, Provincia de Córdoba">Villa de Las Rosas, Provincia de Córdoba</option>
          <option value="El Maitén, Provincia de Chubut">El Maitén, Provincia de Chubut</option>
          <option value="San José de la Dormida, Provincia de Córdoba">San José de la Dormida, Provincia de Córdoba</option>
          <option value="Merlo, Provincia de San Luis">Merlo, Provincia de San Luis</option>
          <option value="Potrerillos, Provincia de Mendoza">Potrerillos, Provincia de Mendoza</option>

        </select>

        <select
          name="FilterPileta"
          value={selectedPileta}
          onChange={(e) => handleFilterPileta(e.target.value)}
          className={style.select}
        >
          <option value="">Pileta</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <select
          name="orderPriceChange"
          value={orderPrice}
          onChange={(e) => handleOrderPriceChange(e.target.value)}
          className={style.select}
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor Precio a mayor precio</option>
          <option value="desc">Mayor precio a menor precio</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;