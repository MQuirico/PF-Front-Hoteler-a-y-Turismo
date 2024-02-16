import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function AlignItemsList() {
  const url = window.location.href;
  const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
  const [reviews, setReviews] = React.useState([])

React.useEffect(()=>{
 axios.get(`https://back-hostel.onrender.com/reviews/products/${id}`)
  .then(({data}) => {
    if (data){
    setReviews(data)
  } else {
    setReviews(["No hay reviews"])
  }
  })
  .catch((error) =>{
    throw new Error(error.message);
  } )
  return () => setReviews({});
}, [id])

console.log(reviews)

  if(reviews)
  return (
    <>
    <h5 style={{
        marginLeft: '35vh'
    }}>Algunas reseñas de experiencias en este hospedaje:</h5>
    <List sx={{ width: '65%', marginLeft: '35vh', height: '40%' ,bgcolor: 'background.paper', overflow: "hidden", overflowY: "auto" }}>
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