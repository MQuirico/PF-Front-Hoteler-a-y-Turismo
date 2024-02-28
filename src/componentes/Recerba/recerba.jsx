import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../../redux/Actions/actions'
import { AuthContext } from '../AuthProvider/authProvider';
import "./reserba.css"
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import MP from "../../assets/MP.jpg"


const ReservationForm = (props) => {
    
    initMercadoPago('TEST-7860a425-2de7-43eb-bb06-ddcc75336f75', 
    {locale: "es-AR"}
    );
    const [products, setProducts] = useState({});
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);
    const {register, handleSubmit, reset, setValue } = useForm()
    const [MPpref, setMPpref] = useState(null)
    const [errDate, setErrDate] = useState(null)
    const info = useSelector(state => state.stateB.reservData.reservation)
   
    const createPreference = async (data) => {
        try { 
            const body = {
                productId: info.products.id, 
                userId: auth.token.id, 
                quantity: data.quantity,
                startDate: data.startDate,
                endDate: data.endDate,
                totalGuests: Number(data.guests)
            }
            console.log(body)
        const response = await axios.post("http://localhost:3003/payment/create-order", body);

        const url = response.data.link;
        return url
        }   
        catch(error){
            console.log(error)
        }
        }
    
     const handleBuy = async (data) => {
        const url = await createPreference(data);
       if (url){
        setMPpref(url)
        
       }
    } 
console.log(MPpref)
    const submit = (data) =>{
        const fechaInicial = new Date(data.startDate);
        const fechaFinal = new Date(data.finDate);
        const diferenciaMilisegundos = fechaFinal.getTime() - fechaInicial.getTime();
        const diasDeDiferencia = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
        console.log(diasDeDiferencia)
        if(diasDeDiferencia > 0){
            setErrDate(null) 
        const toSend = {
            startDate: data.startDate,
            endDate: data.finDate,
            quantity: diasDeDiferencia,
            guests: data.guests
        }
       handleBuy(toSend) 
       reset()
       Object.keys(data).forEach((fieldName) => {
                  setValue(fieldName, null);
                });} else {
                    setErrDate("La fecha de Salida no puede ser anterior a la fecha de Entrada")
                }
        
        
    }


     
    console.log(MPpref)

    return (
        <div className="reservationcontainer">
            <h2 className='titulo'>Reserva tu estadía en "{info.products.name}"</h2>
            <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
                <label htmlFor="guests">Cantidad de Huéspedes:</label>
                <input
                    type="number"
                    id="guests"
                    min="1"
                    max="10"
                    onKeyPress={(event) => {        
                    const pattern = /[0-9\b]/;
                    if (!pattern.test(event.key)) {
                    event.preventDefault();
                        }
                    }}
                    {...register("guests", { required: true })}
                />
            </div>
            {/* <div className="form-group">
                <label htmlFor="rooms">Cantidad de Habitaciones:</label>
                <input
                    type="number"
                    id="rooms"
                    min="1"
                    max="5"
                    {...register("roomsQuan", { required: true })}
                />
            </div> */}
            <div className="form-group">
                <label htmlFor="checkInDate">Fecha de Entrada:</label>
                <input
                    type="date"
                    id="checkInDate"
                    {...register("startDate", { required: true })}        
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkOutDate">Fecha de Salida:</label>
                <input
                    type="date"
                    id="checkOutDate"
                    {...register("finDate", { required: true })}
                />
            </div>
              
                {errDate && <p style={{color: "red"}}>{errDate}</p>}

               <button type="submit">Iniciar Reserva</button> 
            
            </form>
           {MPpref && <img >

           </img>
           }
          
        </div>
    );
};

export default ReservationForm;


/* onClick={()=>{handleBuy(event)}} */