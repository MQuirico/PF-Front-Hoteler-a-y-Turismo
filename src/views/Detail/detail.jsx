import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../redux/Actions/actions';
import './detail.css';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});
  const productsState = useSelector((state) => state.products);
  const location = useLocation(); // Obtener la ubicación del estado
  const selectedImage = location.state && location.state.selectedImage; // Obtener la imagen del estado
/// DETAIL RECIBE DE CARD POR STATE LA PROP IMAGE CON LA CONST SELECTEDIMAGE ///

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  
  marginLeft: "2px !important",
  marginBottom: "4px !important",
  '.Mui-selected': {
    backgroundColor: 'orange',
  },
}));


function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span style={{
      color: "black",
      fontSize: "large",
      marginTop: "4vh"
    }} >
      <strong>Disponiblidad</strong> para reserva
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}


/// LA CONST PRODUCTSSTATE TRAE TODA LA INFO COMPLETA DEL PRODUCTO DESDE PRODUCTS, REDUCER ////
  useEffect(() => {
    axios.get(`http://localhost:3000/products/detail/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setProducts(data);
        } else {
          throw new Error(`Product with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    // Limpiar el estado cuando se desmonta el componente.
    return () => setProducts({});
  }, [id]);

  useEffect(() => {
    if (!productsState) {
      dispatch(fetchProducts(id));
    }
  }, [dispatch, id, productsState]);

  if (!products || !products.name) {
    return <div>Loading...</div>;
  }

  const renderPool = (poolValue) => {
    return poolValue ? 'Posee piscina' : 'No posee piscina';
  };

  return (

    <div className="container" style={{
      backgroundImage: "url('https://media.infocielo.com/p/dbc6bcdde57cfd82955b5b47f3d9eaa1/adjuntos/299/imagenes/001/307/0001307849/1200x675/smart/turismo-rural-gandara-chascomus-refugio-el-vergeljpg.jpg')", 
      backgroundSize: "cover",
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat", 
      height: "94.9vh",
      maxWidth: "300vh"
      
      }} >
      <div className="detailContainer" style={{
        backgroundColor: "rgba(245, 245, 245, 0.65)",
        height: "90vh",
        width: "107vh",
        marginTop: "1.5vh",
        marginLeft: "100vh",
        borderRadius: "5%"

      }} >
          
        <div className="detailContent" style={{
          marginTop: "1vh",
          marginLeft: "2vh",
          height: "90vh",
          width: "107vh",
          position: "fixed",
          
        }}>
          <img style={{
            borderRadius: "8%"
          }}
            src={products.images[0]}
            alt={products.name}
          />
          <h2 style={{
          marginLeft: "55vh",
          marginTop: "-26vh",
          position: "fixed",
          color: "brown"
          }}>{products.name}</h2>
            <h4 style={{
            marginLeft: "41vh",
            marginTop: "-22vh"
          }}>{products.location}</h4>
            <h4 style={{
          marginLeft: "41vh"
          }}>AR$ {products.pricePerNight}/noche</h4>
            <h4 style={{
          marginLeft: "41vh"
          }}>Cantidad de Habitaciones: {products.totalRooms}</h4>
            <h4 style={{
          marginLeft: "41vh"
          }}>Idóneo para alquilar en: {products.season.join(", ")}</h4>
            <h4 style={{
          marginLeft: "41vh"
          }}>{renderPool(products.pool)}</h4>
          
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
        >
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
        
        <StyledDateCalendar />
        
        </DemoItem>
        </DemoContainer>
        </LocalizationProvider>

        </div>
        <button>Hacer reserva</button>
      </div>

      

    </div>
  );
}

export default Detail;