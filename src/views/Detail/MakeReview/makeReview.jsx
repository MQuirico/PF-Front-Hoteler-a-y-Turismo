import * as React from 'react';
import {useForm} from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {AuthContext} from '../../../componentes/AuthProvider/authProvider'


export default function MakeReview(){
    const {register, reset, handleSubmit, setValue} = useForm()
    const [value, estValue] = React.useState(2);
    const {auth} = React.useContext(AuthContext);

    const url = window.location.href;
    const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
    console.log(typeof id, id)
    
    

    const onSubmit = (data) => {
        console.log(data)
        const dataToSend = {
            ...data,
            name: auth.token.name,
            profileImage: auth.token.imageUrl
        }
        console.log(dataToSend)
        axios.post(`https://back-hostel.onrender.com/reviews/products/detail/${id}`, dataToSend)
        .then(response => {
            console.log('Reseña enviada exitosamente:', response.data);
        Object.keys(data).forEach((fieldName) => {
            setValue(fieldName, null);
          });
          reset()
          estValue(2)
    })
    .catch(error => {
        console.error('Error al enviar la reseña:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    });
}

console.log(window.location.href)
    

    if (auth){
        return (
        <div style={{marginTop: '6vh', position: 'fixed'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h5>   ¿Has vacacionado en este sitio 🏨? Deja una reseña pública<br></br> 
            para que los demás usuarios conozcan tu experiencia en este hospedaje.😊</h5>
            <Typography style={{marginLeft: '73vh', marginTop: '-6vh', position: 'fixed'}} component="legend">Califica este hospedaje</Typography>
            <Rating
            style={{marginLeft: '75.5vh', marginTop: '-4vh',position: 'fixed'}}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            estValue(newValue);
            }}
            onClick= {() => setValue('rating', value)}
            />
            <input id="rev" style={{width: '90vh', height: '12vh'}} type="textarea" {...register('content', { required: true })}></input>
            <button type="submit" style={{height: '10vh', position: 'fixed'}}>Enviar Reseña</button>
            </form>
        </div>
    )}
    else {
        return (
            <h4 style={{marginTop: '10vh', marginLeft: '19vh', position: 'fixed', textAlign: 'center'}}>
            Inicia sesión para dejarnos tus comentarios<br></br>
            y reseñas acerca de tus experiencias en nuestros hospedajes</h4>
        )
    }
}

