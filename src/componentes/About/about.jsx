import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Container, Grid, Typography, Card, CardContent, CardMedia, Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#0d0d0e',
    marginBottom: theme.spacing(2),
    marginTop: '70px'
  },
  navItem: {
    marginRight: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  cardMedia: {
    height: 200,
    backgroundSize: 'cover',
  },
  cardContent: {
    backgroundColor: '#f5f5f5',
  },
  contactInfo: {
    backgroundColor: '#626369',
    color: '#ffffff',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  contactItem: {
    marginBottom: theme.spacing(1),
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Container>
          <Typography variant="h6" className={classes.navItem}>
            Conoce más de nosotros
          </Typography>
        </Container>
      </AppBar>
      
      <Container>
        <section className={classes.section}>
          <Typography variant="h4">Qué hacemos</Typography>
          <Typography variant="body1" style={{ color: 'black' }}>
      En nuestro servicio, ofrecemos reservas de cabañas para unas vacaciones inolvidables. Nos especializamos en brindar experiencias únicas y acogedoras para nuestros clientes.
    </Typography>
          <Card className={classes.section}>
            <CardMedia
              className={classes.cardMedia}
              image="https://fondosmil.com/fondo/8004.jpg"
              title="Cabaña"
            />
          </Card>
        </section>

        <section className={classes.section}>
          <Typography variant="h4">Regístrate y descubre</Typography>
          <Typography variant="body1" style={{ color: 'black' }}>
            Nos enorgullecemos de ofrecer a nuestros clientes la oportunidad de registrarse y descubrir los mejores lugares para vacacionar. Cuidamos cada detalle para garantizar una experiencia única y sorprendente en cada visita.
          </Typography>
        </section>

        <section className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Nuestros puntos fuertes</Typography>
              <Typography variant="body1" style={{ color: 'black' }}>
                Nuestra principal prioridad es proporcionar una estancia excepcional para nuestros huéspedes. Nos esforzamos por la excelencia en cada aspecto, desde la comodidad de nuestras cabañas hasta la eficiencia de nuestro servicio.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Conoce nuestros servicios</Typography>
              <List>
                {['Desayuno incluido.', 'Canales de televisión satelital', 'Posibilidad de estacionar vehículos', 'Cocina con refrigerador', 'Cama y ropa de cama incluida'].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Ponte en contacto con nosotros</Typography>
              <Card className={classes.contactInfo}>
                <List>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Teléfono: 123-456-789" />
                  </ListItem>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Facebook: @cabañascbv" />
                    <FacebookIcon />
                  </ListItem>
                  <ListItem className={classes.contactItem}>
                    <ListItemText primary="Instagram: @cabañassvd" />
                    <InstagramIcon />
                  </ListItem>
                </List>
                <Divider />
                <Typography variant="body2" className={classes.contactItem}>
                  ¡Agréganos para mantenerte actualizado con nuestras últimas ofertas y novedades!
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </section>
      </Container>
    </div>
  );
}

export default About;