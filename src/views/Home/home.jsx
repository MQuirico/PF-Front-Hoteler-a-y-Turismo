import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, CardMedia } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopLocations } from '../../redux/Actions/actions';
import { useHistory } from 'react-router-dom';
import "./home.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: '50px'
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    cursor: 'pointer' // Add cursor pointer to indicate clickable
  },
  media: {
    height: 140,
  },

  title: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Sombra para un efecto futurista
    textAlign: 'center', // Centrar el texto
    marginBottom: theme.spacing(2), // Espaciado entre títulos y subtítulos
 },
 subtitle: {
    fontFamily: 'Source Sans Pro',
    color: '#333',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Sombra más suave para el subtítulo
    textAlign: 'center', // Centrar el texto
    marginBottom: theme.spacing(4), // Espaciado entre subtítulos y contenido
 },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const topLocations = useSelector(state => state?.stateA?.topLocations);
  const history = useHistory();

  const handleLocationClick = (location, ranking) => {
    // Redirect to Filter component with selected location info
    history.push('/home', { selectedLocation: location, rankingNumber: ranking });
  };

  useEffect(()=>{
    dispatch(fetchTopLocations())
  },[])

  console.log(topLocations)

  return (
    <div id="home">
      <section id="titleHeader">
        <Typography variant="h2" gutterBottom id="title"> 
          ¡Bienvenido a HostelsPremium!
        </Typography>
      
        <Typography variant="h4" gutterBottom id="subTitle">
          ¡He aquí los destinos más elegidos por nuestros clientes!
        </Typography>
      </section>
  
        <section id="gridDestinations">
          {topLocations && topLocations.map((location, index) => (
                <Card 
                key={index} 
                id="topLocation"
                onClick={() => handleLocationClick(location.productLocation, index + 1)}>
                  <CardMedia
                    style={{
                      height: "200px",
                    }}
                    image={`https://cdn.prod.website-files.com/606b26f64f1ab86f076d9377/652874725bce52903374d7ab_3.png`}
                    title={location.productName}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" color='black'>
                      Puesto #{index + 1}:{location.productLocation}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {location.productName}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
        </section>
    </div>
  );
};

export default HomePage;