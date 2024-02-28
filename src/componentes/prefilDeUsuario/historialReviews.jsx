import * as React from 'react';
import './historialReviews.css';
import * as ReactRedux from 'react-redux';
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {fetchProducts} from '../../redux/Actions/actions';
import Del from '../../assets/borrar.png'
import axios from 'axios'
import { AuthContext } from '../AuthProvider/authProvider';
import { getFavorites } from '../../redux/Actions/actions';

export default function ReviewsHistory (){
  const {auth} = React.useContext(AuthContext)
  const dispatch = ReactRedux.useDispatch()
  const favorites = ReactRedux.useSelector(state => state.stateA.favorites.data)
  const products = ReactRedux.useSelector(state => state.stateA.products)
  const [fav, setFav] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  
console.log(favorites)
 
  React.useEffect(() => {
    dispatch(fetchProducts(null, currentPage,18 ));
  }, [dispatch, currentPage]);

  React.useEffect(() => {
    let favs = products.filter(product => favorites?.productId.includes(product.id));
    setFav(favs);
  }, [products, favorites]);
  
 const deletion = (id) => {
  /* let strGoogleId = auth.token.googleId
  if(auth.token.googleId){
    strGoogleId = toString(auth.token.googleId)
  }
   */
  const toSend ={
    userId: auth.token.id,  //recordar manejar usuarios de Google
    productId: id
  }
  axios.delete("https://back-hostel.onrender.com/favorites/delete", { data: toSend })
  .then((response) =>{
    if (response.data.message){
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
  })
 }
console.log(favorites?.productId.length ,fav.length)
 return(
  <div style={{
    overflowX: "hidden",/* Oculta la barra de desplazamiento horizontal */
    overflowY: "hidden",
    height: "89vh",
    width: "174vh",
    display: "grid",
    marginTop: "6.1vh",
    gridTemplateColumns: "repeat(5, 1fr)", // 6 columnas
    gridTemplateRows: "repeat(4, minmax(300px, 1fr))", // 4 filas con altura mínima de 200px
    gap: "1vh", // Espacio entre las cards
    backgroundImage: "url(https://www.minimalstudio.es/wp-content/uploads/2022/02/caracteristicas-de-la-arquitectura-minimalista-minimal-studio.jpg)", 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}>
   {fav.length === 0 && 
    <div style={{ 
  border: "2px solid red",
  borderRadius: "5%",
  backgroundColor: "rgba(255, 0, 0, 0.15)",
  height: "10vh",
  width: "40vh",
  marginTop: "15vh",
  marginLeft: "30vh",
  position: "fixed"
  }}>
  <p style={{
  textAlign: "center",
  position: "fixed",
  fontSize: "larger",
  color: "red",
  marginTop: "0.7vh",
  marginLeft: "3vh",
  fontWeight: "bold"
   }}>
   No has marcado ningún <br></br> hospedaje como favorito aún.<br></br> <Link to="/search">Descubre un hospedaje de tu interés</Link>
   </p>
  </div> 
   } 
  

   {fav.map((element, index) =>
   
    <Card key={index} sx={{ maxWidth: 1000}}>
      <CardActionArea key={index}>
        <CardMedia
          key={index}
          component="img"
          height="140"
          image={element?.images[0]}
          alt="green iguana"
        />
        <CardContent>
        <Link to={`/detail/${element?.id}`}>
          <Typography  gutterBottom variant="h5" component="div">
            {element?.name}
          </Typography>
        </Link>
          <Typography  variant="body2" color="text.secondary">
            {element.location}
            <br></br>
            Temporadas: {element?.season.join(", ")}
            <br></br>
            AR${element.pricePerNight}/noche
          </Typography>
          <img 
          src={Del} 
          style={{
            maxHeight: "5vh",
            maxWidth: "3vh",
            marginLeft: "25vh",
            cursor: "pointer"
          }}
          onClick={() => {deletion(element.id)}}
          >

          </img>
        </CardContent>
      </CardActionArea>
    </Card> 
    )
    }

  
  </div>
 )

}
  