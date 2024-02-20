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
  const reviews = useSelector((state)=> state.reviews.data)
  const dispatch = useDispatch()
  console.log(id)
  

console.log(reviews)

  if(reviews)
  return (
    <>
    <h5 style={{
        marginLeft: '35vh',
        marginTop: "2vh"
    }}>Algunas reseñas de experiencias en este hospedaje:</h5>
    <List sx={{ 
      width: '65%', 
      marginLeft: '35vh', 
      height: '40%',
      bgcolor: 'background.paper', 
      overflowY: "auto",
      marginTop: "3vh",
      borderRadius: "3%"
    }}>
    {Object.keys(reviews).map((key) => {
    const review = reviews[key];
    return (
      <React.Fragment key={key}>
        <ListItem sx={{ height: '10vh' }} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar  src={review.profileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={review.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {review.rating}/5
                </Typography>
                {` — ${review.content}`}
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