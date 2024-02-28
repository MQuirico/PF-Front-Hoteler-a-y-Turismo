import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';

export default function AlignItemsList() {
  const url = window.location.href;
  const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
  const reviews = useSelector((state)=> state.stateA.reviews.data)
  const dispatch = useDispatch()
  console.log(id)
  

console.log(reviews)

  if(reviews)
  return (
    <>
      <h5 style={{
        marginLeft: '220px',
        marginTop: "620px",
        position: "absolute",
        fontSize: "22px",
        borderBottom: "1px solid black",
        padding: "5px"
      }}>Algunas reseñas de experiencias:</h5>
      <List sx={{ 
        color: "black",
        width: '650px',
        height: "330px",
        marginLeft: '150px', 
        bgcolor: 'background.paper', 
        overflowY: "auto",
        marginTop: "670px",
        borderRadius: "3%",
        position: "absolute",
        backgroundColor: "transparent",
        "&::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}>
        {Object.keys(reviews).map((key) => {
          const review = reviews[key];
          return (
            <React.Fragment key={key}>
              <ListItem sx={{ height: '10vh', color: "black" }} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={review.profileImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: '#007bff' }} // Cambia el color del nombre de la reseña
                      variant="subtitle1"
                      component="span"
                    >
                      {review.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', color: 'green' }} // Cambia el color del texto de la calificación
                        component="span"
                        variant="body2"
                      >
                        {review.rating}/5
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', color: 'black' }} // Cambia el color del texto de la reseña publicada
                        component="span"
                        variant="body2"
                      >
                        {` — ${review.content}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
  
      </List>
    </>
  );
  if (reviews == {}) {
    return (
      <List sx={{ width: '65%', marginLeft: '35vh', height: '40%' ,bgcolor: 'background.paper' }}>
        <ListItem sx={{ height: '10vh' }} alignItems="flex-start">
          
          <ListItemText
            primary="ESTE HOSPEDAJE AÚN NO TIENE RESEÑAS HECHAS"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ayuda a los demás usuarios en su elección
                </Typography>
                {` — ¡Haz una valoración positiva de tu estadía en este hospedaje}`}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    )
  }
}