import * as React from 'react';
import {useForm} from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import usAvatar from '../../../assets/user.png'
import {AuthContext} from '../../../componentes/AuthProvider/authProvider'
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../../redux/Actions/actions';
import {Link} from 'react-router-dom'
export default function MakeReview(){
    const {register, reset, handleSubmit, setValue} = useForm()
    const [value, estValue] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const {auth} = React.useContext(AuthContext);
    const dispatch = useDispatch()
    const url = window.location.href;
    const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const onSubmit = (data) => {
        console.log(data)
        const dataToSend = {
            ...data,
            name: auth.token.name,
            profileImage: auth.token.imageUrl || usAvatar
        }
        console.log(dataToSend)
        axios.post(`http://localhost:3002/reviews/products/detail/${id}`, dataToSend)
        .then(response => {
            console.log('Reseña enviada exitosamente:', response.data);
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, null);
          });
          reset()
          estValue(0)
          if(response.data){dispatch(fetchReviews(id))}
    })
    .catch(error => {
        console.error('Error al enviar la reseña:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    });
}

console.log(window.location.href)
    

    if (auth){
        return (
        <div style={{
            marginTop: '60vh',
            marginRight: '20vh',
            position: 'fixed'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h5 style={{ 
            textAlign: "center",
            marginLeft: "1vh"
            }} >   ¿Has vacacionado en este sitio 🏨? Deja una reseña pública para <br></br> 
            que los demás usuarios conozcan tu experiencia en este hospedaje.😊</h5>
            <Typography style={{marginLeft: '67vh', marginTop: '-6vh', position: 'fixed'}} component="legend">Califica este hospedaje</Typography>
            <Rating
            style={{marginLeft: '69vh', marginTop: '-4vh',position: 'fixed'}}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            estValue(newValue)
            setValue('rating', newValue)
            }}
            />
            <input 
            id="rev" 
            style={{
                width: '70vh', 
                height: '9vh', 
                marginLeft: "0vh",
                marginBottom: "-5vh",
                position: "fixed"}} 
            type="textarea" 
            {...register('content', { required: true })}></input>
            <button type="submit" style={{height: '9vh', marginLeft:"70vh" ,position: 'fixed'}}>Enviar Reseña</button>
            </form>
        </div>
    )}
    else {
        return (
            <h4 style={{
             marginTop: '70vh',
             marginLeft: '7vh', 
             position: 'fixed', 
             textAlign: 'center'}}>
            <Link to="/login">Inicia sesión</Link> para dejarnos tus comentarios<br></br>
            y reseñas acerca de tus experiencias en nuestros hospedajes</h4>
        )
    }
}


