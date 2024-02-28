import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, CardMedia } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopLocations } from '../../redux/Actions/actions';
import { useHistory } from 'react-router-dom';

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
  const topLocations = useSelector(state => state.stateA.topLocations);
  const history = useHistory();

  const handleLocationClick = (location, ranking) => {
    // Redirect to Filter component with selected location info
    history.push('/home', { selectedLocation: location, rankingNumber: ranking });
  };

  return (
    <div style={{
      backgroundImage: `url("https://en.idei.club/uploads/posts/2023-06/thumbs/1687339939_en-idei-club-p-white-abstract-design-dizain-pinterest-61.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '126vh',
      marginTop: "0px",
    }}>
    <section style={{marginTop: "10px"}}>
      <Typography variant="h2" gutterBottom className={classes.title} style={{marginTop:"75px",marginBottom:"-80px"}}>
        ¡Bienvenido a HostelsPremium!
      </Typography>
    </section>

    <section className={classes.section}>
      <Typography variant="h4" gutterBottom className={classes.title} style={{marginTop: "150px", marginBottom: "-50px"}}>
        ¡He aquí los destinos más elegidos por nuestros clientes!
      </Typography>

    
        <br />
        <br />
        <Grid container spacing={4}>
 {topLocations && topLocations.map((location, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card style={{
        height: "400px",
        maxwidth: "400px",
        minWidth: "400px",
        marginLeft: "80px",
        marginTop: "50px",
        backgroundColor: "transparent",
        cursor: "pointer" // Añade esta línea para cambiar el cursor a una mano
      }} onClick={() => handleLocationClick(location.productLocation, index + 1)}>
        <CardMedia
          style={{
            height: "300px",
          }}
          image={`https://source.unsplash.com/featured/?${location.productLocation}`}
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
    </Grid>
  ))}
</Grid>
      </section>
    </div>
  );
};

export default HomePage;