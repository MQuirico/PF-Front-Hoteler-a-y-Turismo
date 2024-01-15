import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function BasicRating() {
  const [value, setValue] = React.useState(null);
 const [reseña, setReseña] = React.useState('');

 const manejoCambio = (e) => {
   setReseña(e.target.value)
 }

 return (
   <Form>
     <Form.Group controlId="rating">
       <Typography component="legend">Calificación</Typography>
       <Rating
         name="simple-controlled"
         value={value}
         onChange={(event, newValue) => {
           setValue(newValue);
         }}
       />
     </Form.Group>
     <Form.Group controlId="review">
       <Form.Label>Describa aquí su apreciación del producto y su experiencia de compra:</Form.Label>
       <Form.Control as="textarea" rows="4" value={reseña} onChange={manejoCambio} />
     </Form.Group>
     <Button variant="primary" type="submit">
       Enviar
     </Button>
   </Form>
 );
}