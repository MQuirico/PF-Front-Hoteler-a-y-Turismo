import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    'margin-top': '50px'
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
  },
  media: {
    height: 140, // ajusta la altura de la imagen según tus necesidades
  },
}));

const HomePage = () => {
  const classes = useStyles();

  // Ejemplo de datos de publicaciones
  const publicaciones = [
    {
      titulo: 'Bariloche',
      contenido: 'Descubre la belleza natural de Bariloche, situado en la Patagonia Argentina. Con sus impresionantes paisajes montañosos, lagos cristalinos y delicioso chocolate artesanal, Bariloche es el destino perfecto para los amantes de la aventura y la naturaleza.',
      imagen: 'https://live.staticflickr.com/65535/53208348051_db62514125_k.jpg'
    },
    {
      titulo: 'Mar del Plata',
      contenido: 'Disfruta del sol y las playas de Mar del Plata, la ciudad costera más grande de Argentina. Con sus hermosas playas, vibrante vida nocturna y deliciosa gastronomía costera, Mar del Plata ofrece entretenimiento para toda la familia.',
      imagen: 'https://mardelplata.gob.ar/sites/default/files/texto_slide/xMDP2.jpg.pagespeed.ic.oKataM9oHk.jpg'
    },
    {
      titulo: 'Iguazú',
      contenido: 'Maravíllate con las majestuosas Cataratas del Iguazú, una de las maravillas naturales del mundo ubicadas en la frontera entre Argentina y Brasil. Sumérgete en la exuberante selva tropical y déjate cautivar por la belleza impresionante de Iguazú.',
      imagen: 'https://d5ofdvz67shaj.cloudfront.net/original/?url=https://cdn.radionacional.com.ar/wp-content/uploads/2023/11/394115875_710144304491443_9019878439564463537_n-1.jpg'
    },
    {
      titulo: 'Salta',
      contenido: 'Explora la rica historia y la arquitectura colonial de Salta, una ciudad encantadora en el noroeste de Argentina. Con su clima cálido, hermosos paisajes y deliciosa comida regional, Salta te sorprenderá en cada esquina.',
      imagen: 'https://www.tangol.com/Fotos/Tours/paquete-turistico-a-salta-y-jujuy-clasico_778_201804271014311.Mobile.JPG'
    },
    {
      titulo: 'Mendoza',
      contenido: 'Sumérgete en el corazón de la región vinícola de Argentina en Mendoza. Disfruta de catas de vino, impresionantes paisajes de montaña y aventuras al aire libre en esta vibrante ciudad en el oeste argentino.',
      imagen: 'https://media.viajando.travel/p/9791cb2039b4d3cb290c00d2f02b2007/adjuntos/236/imagenes/000/496/0000496152/1200x0/smart/parque-provincial-aconcagua-mendoza.jpg'
    },
    {
      titulo: 'Ushuaia',
      contenido: 'Embárcate en una aventura inolvidable en Ushuaia, la ciudad más austral del mundo. Con su paisaje montañoso, el Canal Beagle y la oportunidad de explorar la Antártida, Ushuaia es un paraíso para los amantes de la naturaleza y la aventura.',
      imagen: 'https://www.terramar.tur.ar/media/news/Ushuaia%20-%20Terramar.jpg'
    },
    {
      titulo: 'Córdoba',
      contenido: 'Descubre la belleza cultural y natural de la provincia de Córdoba. Con sus hermosas sierras, ríos cristalinos y pueblos encantadores, Córdoba ofrece una experiencia única para los viajeros que buscan tranquilidad y belleza escénica.',
      imagen: 'https://www.cordobaturismo.gov.ar/wp-content/uploads/2018/07/Ciudad-de-C%C3%B3rdoba-1-scaled.jpg'
    },
    {
      titulo: 'Tandil',
      contenido: 'Relájate y recarga energías en Tandil, un encantador destino ubicado en la provincia de Buenos Aires. Con su aire puro, paisajes serenos y deliciosa gastronomía local, Tandil es el lugar perfecto para escapar del bullicio de la ciudad.',
      imagen: 'https://revistauncamino.com.ar/wp-content/uploads/2023/07/TANDIL-NOTANOVIEMBRE.jpg'
    },
    {
      titulo: 'San Carlos de Bariloche',
      contenido: 'Descubre la belleza natural de San Carlos de Bariloche, ubicado en la Patagonia argentina. Con sus impresionantes paisajes montañosos, lagos cristalinos y delicioso chocolate artesanal, Bariloche es el destino perfecto para los amantes de la naturaleza y la aventura.',
      imagen: 'https://i0.wp.com/www.patagoniaandina.com/wp-content/uploads/2020/05/Bariloche-postada.jpg?resize=833%2C471&ssl=1'
    },
    {
      titulo: 'El Calafate',
      contenido: 'Maravíllate con los majestuosos glaciares de El Calafate en la Patagonia argentina. Con su impresionante paisaje de hielo y montañas, El Calafate ofrece una experiencia única para los amantes de la naturaleza y la aventura.',
      imagen: 'https://i.ytimg.com/vi/0qe4rStwiHY/maxresdefault.jpg'
    },
    {
      titulo: 'Rosario',
      contenido: 'Descubre la belleza y el encanto de la ciudad de Rosario, situada a orillas del río Paraná en la provincia de Santa Fe. Con su vibrante vida cultural, arquitectura histórica y deliciosa comida regional, Rosario es un destino imperdible en Argentina.',
      imagen: 'https://www.clarin.com/img/2015/11/10/BksaAQJVe_1256x620.jpg'
    },
    {
      titulo: 'Villa Gesell',
      contenido: 'Relájate en las hermosas playas de Villa Gesell, un destino de verano popular en la costa atlántica de Argentina. Con sus amplias playas doradas, ambiente tranquilo y actividades al aire libre, Villa Gesell es ideal para disfrutar en familia o con amigos.',
      imagen: 'https://media.viajando.travel/p/4b60a6e3ddd842457a32205b52eb6db8/adjuntos/236/imagenes/000/656/0000656568/verano-villa-gesell.png'
    },
  ];
  return (
    <div className={classes.root}>
      {/* Sección de Presentación */}
      <section className={classes.section}>
      <Typography variant="h3" gutterBottom style={{ fontFamily: 'Source Sans Pro', 'margin-left': '503px' }}>
          ¡Bienvenido a HostelsPremium!
        </Typography>
        <Typography variant="body1" style={{ color: 'black', 'margin-left': '445px' }}>
        "Tu escape perfecto: HostelsPremium – Descubre el destino ideal para tus alquileres vacacionales."
        </Typography>
      </section>

      {/* Sección de Publicaciones */}
      <section className={classes.section}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Source Sans Pro' }}>
         ¡He aquí los destinos más elegidos por nuestros clientes!
        </Typography>
        <Typography variant="body1" style={{ color: 'black' }}>
          ¿A que a tí también te encantaría vacacionar en uno de ellos? ¡Explora aún más destinos en nuestro buscador!
        </Typography>
        <br></br>
        <br></br>
        <Grid container spacing={2}>
          {publicaciones.map((publicacion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={publicacion.imagen}
                  title={publicacion.titulo}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {publicacion.titulo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {publicacion.contenido}
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