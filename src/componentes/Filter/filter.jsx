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
          <optgroup label="Provincia de Buenos Aires">
  <option value="San Pedro">San Pedro</option>
</optgroup>
<optgroup label="Provincia de Chubut">
  <option value="Cholila">Cholila</option>
  <option value="El Hoyo">El Hoyo</option>
  <option value="El Maitén">El Maitén</option>
  <option value="El Bolsón">El Bolsón</option>
</optgroup>
<optgroup label="Provincia de Córdoba">
  <option value="Los Reartes">Los Reartes</option>
  <option value="San Marcos Sierras">San Marcos Sierras</option>
  <option value="Cuesta Blanca">Cuesta Blanca</option>
  <option value="Villa Ciudad Parque Los Reartes">Villa Ciudad Parque Los Reartes</option>
  <option value="Villa Cura Brochero">Villa Cura Brochero</option>
  <option value="Villa Berna">Villa Berna</option>
  <option value="Nono">Nono</option>
  <option value="Las Rabonas">Las Rabonas</option>
  <option value="Miramar">Miramar</option>
  <option value="San Roque">San Roque</option>
  <option value="Villa de Las Rosas">Villa de Las Rosas</option>
  <option value="San José de la Dormida">San José de la Dormida</option>
  <option value="Yacanto de Calamuchita">Yacanto de Calamuchita</option>
</optgroup>
<optgroup label="Provincia de Jujuy">
  <option value="Purmamarca">Purmamarca</option>
  <option value="Tilcara">Tilcara</option>
  <option value="Yavi">Yavi</option>
  <option value="Maimará">Maimará</option>
</optgroup>
<optgroup label="Provincia de Mendoza">
  <option value="Potrerillos">Potrerillos</option>
</optgroup>
<optgroup label="Provincia de Misiones">
  <option value="El Soberbio">El Soberbio</option>
  <option value="Santa Ana">Santa Ana</option>
</optgroup>
<optgroup label="Provincia de Neuquén">
  <option value="Villa Pehuenia">Villa Pehuenia</option>
  <option value="Villa Traful">Villa Traful</option>
  <option value="Caviahue">Caviahue</option>
  <option value="Villa Meliquina">Villa Meliquina</option>
  <option value="Villa La Angostura">Villa La Angostura</option>
  <option value="Villa Lago Meliquina">Villa Lago Meliquina</option>
  <option value="Villa Quila Quina">Villa Quila Quina</option>
  <option value="El Chocón">El Chocón</option>
</optgroup>
<optgroup label="Provincia de Río Negro">
  <option value="Las Grutas">Las Grutas</option>
  <option value="Colonia Suiza">Colonia Suiza</option>
  <option value="El Condor">El Condor</option>
</optgroup>
<optgroup label="Provincia de Salta">
  <option value="San Antonio de los Cobres">San Antonio de los Cobres</option>
</optgroup>
<optgroup label="Provincia de San Luis">
  <option value="Los Molles">Los Molles</option>
  <option value="Merlo">Merlo</option>
</optgroup>
<optgroup label="Provincia de Tucumán">
  <option value="San Javier">San Javier</option>
  <option value="Tafí del Valle">Tafí del Valle</option>
  <option value="San Pedro de Colalao">San Pedro de Colalao</option>
  <option value="El Mollar">El Mollar</option>
</optgroup>
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