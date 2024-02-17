import * as React from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../redux/Actions/actions';
import './detail.css'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AlignItemsList from './ReviewList/reviewList';
import MakeReview from './MakeReview/makeReview'
import { fetchReviews } from '../../redux/Actions/actions';

function Detail() {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({});
  const productsState = useSelector((state) => state.products);
  const location = useLocation(); // Obtener la ubicación del estado
  const url = window.location.href;
  const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
  
  React.useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

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

const StyledLabel = styled(Label)({
  marginRight: "100vh",
  position: "fixed",
  width: "40vh"
})

const StyledDateCalendar = styled(DateCalendar)({
  
  marginLeft: "0.5vh !important",
  marginTop: "3vh !important",
  position: "fixed",

  '.Mui-selected': {
    backgroundColor: 'orange',
  },
});








function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span style={{
      color: "black",
      fontSize: "large",
      marginTop: "-1vh",
      marginLeft: "5vh",
      position: "fixed",
      textAlign: "center"
    }} >
      He aquí un <strong>calendario</strong> para<br></br>
      ayudarte a planificar.
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
  React.useEffect(() => {
    axios.get(`https://back-hostel.onrender.com/products/detail/${id}`)
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

  React.useEffect(() => {
    if (!productsState) {
      dispatch(fetchProducts(id));
    }
  }, [dispatch, id, productsState],
  );


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
      }}>

      <div className="detailContainer" style={{
        backgroundColor: "rgba(245, 245, 245, 0.65)",
        height: "90vh",
        width: "107vh",
        marginTop: "1.5vh",
        marginLeft: "100vh",
        borderRadius: "3%"
      }}>
          
        <div className="detailContent" style={{
          marginTop: "1vh",
          marginLeft: "2vh",
          height: "90vh",
          width: "107vh",
          position: "fixed",
          
        }}>

          <img style={{
            borderRadius: "8%",
            maxHeight: "250px",
            maxWidth: "320px"
          }}
            src={products.images[0]}
            alt={products.name}
          />

          <h2 style={{
          marginLeft: "50vh",
          marginTop: "-22vh",
          position: "fixed",
          color: "brown"
          }}>{products.name}</h2>
            <h4 style={{
            marginLeft: "41vh",
            marginTop: "-18vh"
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
        <DemoItem label={<StyledLabel componentName="DatePicker" valueType="date" />}>
        <StyledDateCalendar />
        </DemoItem>
        </DemoContainer>
        </LocalizationProvider>
        <button style={{
          marginTop: "38vh",
          marginLeft: "19vh",
          position: "fixed",
          cursor: "pointer"
        }}>
        Hacer reserva
        </button>
       
        <AlignItemsList className="list" />
        <MakeReview />
       
        </div>
        
      </div>
      
    </div>
  );
}

export default Detail;