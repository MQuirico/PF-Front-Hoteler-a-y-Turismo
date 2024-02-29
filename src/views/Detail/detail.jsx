import * as React from 'react';
import axios from 'axios';
import * as RRD from 'react-router-dom';
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
import { getFavorites ,startReservation } from '../../redux/Actions/actions';
import {getAllUsers} from '../../redux/Actions/actions';
import ReservationForm from "../../componentes/Reserva/reserva"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";

function Detail() {/* jdkfd */
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({});
  const [favIcon, setFav] = React.useState();
  const {auth} = React.useContext(AuthContext)
  const favorites = useSelector(state => state.stateA.favorites.data)
  const location = RRD.useLocation()
  const url = window.location.href;
  const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
  const productsState = useSelector((state) => state.stateA.products);
  const stateFav = favorites?.productId?.includes(id)
  const history = RRD.useHistory()
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);
  
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
      
      
      
      React.useEffect(() => {
        const id = setInterval(() => {
          if (!isHovered) { 
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products?.images?.length);
          }
        }, 3000);
    
        setIntervalId(id);
    
        return () => {
          clearInterval(id);
        };
      }, [products.images, isHovered]);
      
      
      React.useEffect(() => {
        // Llama a la acción getAllUsers cuando el componente se monte
        dispatch(getAllUsers());
      }, [dispatch]);
      
      React.useEffect(() => {
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
      marginTop: "350px",
      marginLeft: "500px",
      
      textAlign: "center",
      position:"absolute"
    }} >
      <div style={{marginTop: "60px"}}>
      
      </div>
     
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
      userId: auth?.token?.id,  //recordar manejar usuarios de Google
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

  const onClickReserva = () => {
    const toSend = {
      products
    }
    dispatch(startReservation(toSend))
    history.push("/reserva")
  }



  // Manejar clic en la flecha izquierda
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + products.images.length) % products.images.length);
  };

  // Manejar clic en la flecha derecha
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.images.length);
  };

  const handleImageClick = () => {
    // Lógica para abrir la imagen en tamaño más grande
  };

  return (
    <div className='fonderfd'>
      <div className="contasdds">
        <div className="detailContainersdsd">
          <div className="localidad">
            <h3>{products.location}</h3>
          </div>

          {/* Imagen */}
          <div
          className="image-container"
            onMouseEnter={() => setIsHovered(true)} // Establece isHovered en true cuando el mouse entra
            onMouseLeave={() => setIsHovered(false)} // Establece isHovered en false cuando el mouse sale
            onClick={handleImageClick} // Agrega el manejador de eventos para abrir la imagen en tamaño más grande
          >
          {Array.isArray(products.images) && products.images.length > 0 ? (
  <img
    style={{ height: "470px", width: "700px" }}
    src={products.images[currentImageIndex]}
    alt={products.name}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = 'imagen-de-respaldo.jpg'; // URL de una imagen de respaldo
    }}
  />
) : (
  <p>No se encontraron imágenes</p>
)}
            <div className="arrow-container">
              <IconButton onClick={handlePreviousImage}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={handleNextImage}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>

          {/* Resto del contenido */}
          <div className="caracteristicas">
            <h2>{products.name.toUpperCase()}</h2>
            <h4>AR$ {products.pricePerNight}/noche</h4>
            <h4>Cantidad de Habitaciones: {products.totalRooms}</h4>
            <h4>Idóneo para alquilar en: {products.season.join(", ")}</h4>
            <h4>{renderPool(products.pool)}</h4>
          </div>

          {auth && <img
            src={favIcon}
            onClick={setDelFavorite}
            className="favorite-icon"
            style={{}}
          />}

          <div className='ressserv'>
            <ReservationForm info={products} />
          </div>
          <AlignItemsList className="list" />
        </div>
        <MakeReview />
      </div>
    </div>
  );
}

export default Detail; 


