import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReservation } from '../../redux/Actions/actions'
import { AuthContext } from '../AuthProvider/authProvider';
import "./recerba.css"
import axios from 'axios';
import { getAllUsers } from '../../redux/Actions/actions';


const ReservationForm = (props) => {
    const [products, setProducts] = React.useState({});
    const Product = props.location.state;
    console.log("productid",Product);
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);


    const [guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

  
    const handleGuestsChange = (e) => {
        setGuests(e.target.value);
    };

    const handleRoomsChange = (e) => {
        setRooms(e.target.value);
    };

    const handleCheckInDateChange = (e) => {
        setCheckInDate(e.target.value);
    };

    const handleCheckOutDateChange = (e) => {
        setCheckOutDate(e.target.value);
    };

    
    useEffect(() => {
        // Llama a la acción getAllUsers cuando el componente se monte
        dispatch(getAllUsers());
      }, [dispatch]);
      
      useEffect(() => {
        if (!Product.id || !Product || Object.keys(Product).length === 0) {
          dispatch(fetchProducts(Product.id));
        }
      }, [dispatch, Product.id, Product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        
        const userId = auth.token.id
        
        dispatch(createReservation(ProductId.id, userId, checkInDate, checkOutDate, rooms, guests,products.price));
    };
    
    console.log("esto viene de recerba",auth.token.id)
    
    const handlePayClick = async (event, id) => {
    //     event.preventDefault();
    
    //     try {
    //       // Verificar que productId no sea undefined
    //     if (!products) {
    //       console.error('ID del producto no definido.');
    //       return;
    //     }
    
    //       // Enviar la solicitud POST con los datos del producto y del usuario
    // //       const response = await axios.post('http://localhost:3000/payment/create-order', {
    // //         productId: products.id,
    // //         userId: 1,
    // //         quantity: 1,
    // //         card: "visa"
    // //       });
    // //       const { data } = response;
    
    // //       // Redirigir al usuario a la URL proporcionada por MercadoPago utilizando un enlace
    // //       window.location.href = data;
    // //     } catch (error) {
    // //       console.error('Error:', error);
    // //     }
       };
    

    return (
        <div className="reservation-container">
            <h2 className='titulo'>Reserva tu estadía</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div>precio:{products.price}</div>
                    <label htmlFor="guests">Cantidad de Huéspedes:</label>
                    <input
                        type="number"
                        id="guests"
                        value={guests}
                        onChange={handleGuestsChange}
                        min="1"
                        max="10"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rooms">Cantidad de Habitaciones:</label>
                    <input
                        type="number"
                        id="rooms"
                        value={rooms}
                        onChange={handleRoomsChange}
                        min="1"
                        max="5"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkInDate">Fecha de Entrada:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkOutDate">Fecha de Salida:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                        required
                    />
                </div>
                <button type="submit">Reservar</button>
               

               
    
            </form>
                   
        </div>
    );
};

export default ReservationForm;