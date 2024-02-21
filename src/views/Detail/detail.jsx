import * as React from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';
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
import starFil from "../../assets/star-outline-filled.png";
import starOut from "../../assets/star-curved-outline.png";
import { AuthContext } from '../../componentes/AuthProvider/authProvider';
import { getFavorites } from '../../redux/Actions/actions';
import { startReservation } from '../../redux/Actions/actions';

function Detail() {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({});
  const [favIcon, setFav] = React.useState();
  const {auth} = React.useContext(AuthContext)
  const favorites = useSelector(state => state.stateA.favorites.data)
  const location = useLocation()
  const url = window.location.href;
  const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
  const productsState = useSelector((state) => state.stateA.products);
  const stateFav = favorites?.productId?.includes(id)
  let sqrtGoogle = null
  /* switch (stateFav){
      case true: 
      setFav(starFil)
      break;
      case false:
      setFav(starOut)
      break;
      case undefined:
      setFav(starOut)
      break;
      default:
      return
  } */
  

  
  ; // Obtener la ubicación del estado
  
  React.useEffect(() => {
    dispatch(fetchReviews(id));
    switch (stateFav){
      case true: 
      setFav(starFil)
      break;
      case false:
      setFav(starOut)
      break;
      case undefined:
      setFav(starOut)
      break;
      default:
      return
  }
  }, [dispatch, stateFav,starOut,starFil, id]);

  /* React.useEffect(() => {
    localStorage.setItem("FavImage", image);
  }, [image]); */

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
  marginTop: "13vh !important",
  position: "fixed",

  '.Mui-selected': {
    backgroundColor: 'orange',
  },
});


useEffect(() => {
  // Llama a la acción getAllUsers cuando el componente se monte
  dispatch(getAllUsers());
}, [dispatch]);

useEffect(() => {
  if (!id || !products || Object.keys(products).length === 0) {
    dispatch(fetchProducts(id));
  }
}, [dispatch, id, products]);

const handlePayClick = async (event, id) => {
  event.preventDefault();

  try {
    // Verificar que productId no sea undefined
  if (!products) {
    console.error('ID del producto no definido.');
    return;
  }

    // Enviar la solicitud POST con los datos del producto y del usuario
    const response = await axios.post('https://back-hostel.onrender.com/payment/create-order', {
      productId: products.id,
      userId: 1,
      quantity: 1,
      card: "visa"
    });
    const { data } = response;

    // Redirigir al usuario a la URL proporcionada por MercadoPago utilizando un enlace
    window.location.href = data;
  } catch (error) {
    console.error('Error:', error);
  }
};





function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span style={{
      color: "black",
      fontSize: "large",
      marginTop: "3vh",
      marginLeft: "2vh",
      position: "fixed",
      textAlign: "center"
    }} >
      He aquí un <strong>calendario</strong> para ayudarte<br></br>
      a planificar.<br></br>
      ¡Recuerda consultar al titular por<br></br>
      disponibilidad de fechas!<br></br>
      
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

console.log(products)

  React.useEffect(() => {
    if (!productsState) {
      dispatch(fetchProducts(id));
    }
  }, [dispatch, id, productsState],
  );


  if (!products || !products.name) {
    return <div>Loading...</div>;
  }



  const setDelFavorite = () =>{
    
    
    
    const toSend ={
      userId: auth.token.id,  //recordar manejar usuarios de Google
      productId: id
    }
    console.log(toSend)
    switch (favIcon){
      case starOut:
    axios.post("https://back-hostel.onrender.com/favorites/add", toSend)
    .then((response) => {
      if(response){
        setFav(starFil) 
        dispatch(getFavorites(toSend.userId))
      }
    })
    .catch((error) => {
      throw new Error(error.message)
    })
    break;
    case starFil:
      axios.delete("https://back-hostel.onrender.com/favorites/delete", { data: toSend })
      .then((response) =>{
        if (response.data.message){
          setFav(starOut)
          dispatch(getFavorites(toSend.userId))
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Error:', error.response.data.error);
        } else if (error.request) {
          console.error('Error de solicitud:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  
      break;
      default:
        return;
  }}
  

  const renderPool = (poolValue) => {
    return poolValue ? 'Posee piscina' : 'No posee piscina';
  };

  const productsProp = products

  return (
    <div className="container" style={{
      backgroundImage: "url('https://media.infocielo.com/p/dbc6bcdde57cfd82955b5b47f3d9eaa1/adjuntos/299/imagenes/001/307/0001307849/1200x675/smart/turismo-rural-gandara-chascomus-refugio-el-vergeljpg.jpg')", 
      backgroundSize: "cover",
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat", 
      height: "91.8vh",
      width: "209.7vh",
      maxWidth: "270vh",
      marginTop: "80px",
      marginLeft: "0vh",
      overflow: "hidden",
      position: "fixed"
      }}>

      <div className="detailContainer" style={{
        backgroundColor: "rgba(245, 245, 245, 0.65)",
        height: "90vh",
        width: "107vh",
        marginTop: "-1vh",
        marginLeft: "100vh",
        borderRadius: "3%",
        position: "fixed"
      }}>
          
        <div className="detailContent" style={{
          marginTop: "1vh",
          marginLeft: "2vh",
          height: "90vh",
          width: "107vh",
          position: "fixed"
        }}>

          <img style={{
            borderRadius: "8%",
            maxHeight: "250px",
            maxWidth: "320px",
            position: "fixed"
          }}
            src={products.images[0]}
            alt={products.name}
          />

          <h2 style={{
          marginLeft: "45vh",
          marginTop: "1vh",
          position: "fixed",
          color: "brown"
          }}>{products.name}</h2>
            <h4 style={{
            marginLeft: "35vh",
            marginTop: "5vh"
          }}>{products.location}</h4>
            <h4 style={{
          marginLeft: "35vh"
          }}>AR$ {products.pricePerNight}/noche</h4>
            <h4 style={{
          marginLeft: "35vh"
          }}>Cantidad de Habitaciones: {products.totalRooms}</h4>
            <h4 style={{
          marginLeft: "35vh"
          }}>Idóneo para alquilar en: {products.season.join(", ")}</h4>
            <h4 style={{
          marginLeft: "35vh"
          }}>{renderPool(products.pool)}</h4>
          {auth && <img 
          src={ favIcon } 
          style={{
            maxHeight: "6vh", 
            maxWidth: "6vh", 
            marginTop: "-23vh", 
            marginLeft: "98vh", 
            position:"fixed",
            cursor: "pointer"
            }}
          onClick={setDelFavorite}></img>}
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

        <Link to="/reserva">
        <button style={{
          marginTop: "-12vh",
          marginLeft: "83vh",

          position: "fixed",
          cursor: "pointer",
          height: "5vh",
          width: "15vh"
        }}>
        Hacer reserva
        </button>

       </Link>

        <AlignItemsList className="list" />
        
       
        </div>

        <MakeReview />

      </div>
      
    </div>
  );
}

export default Detail;