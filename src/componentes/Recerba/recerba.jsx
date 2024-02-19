import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { createReservation } from '../../redux/Actions/actions'
import { AuthContext } from '../AuthProvider/authProvider';
import "./recerba.css"
import axios from 'axios'

const ReservationForm = (props) => {
    const [products, setProducts] = React.useState({});
    const ProductId = props.location.state;
    console.log("productid",ProductId);
    const dispatch = useDispatch();
    const {auth} = useContext(AuthContext);


    // React.useEffect(() => {
    //     axios.get(`http://localhost:3000/products/detail/${ProductId}`)
    //       .then(({ data }) => {
    //         if (data.name) {
    //           setProducts(data);
    //         } else {
    //           throw new Error(`Product with ID ${id} not found`);
    //         }
    //       })
    //       .catch((error) => {
    //         throw new Error(error.message);
    //       });
    
    //     // Limpiar el estado cuando se desmonta el componente.
    //     return () => setProducts({});
    //   }, [ProductId]);


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

    


    const handleSubmit = (e) => {
        e.preventDefault();

        
        const userId = auth.token.id

        dispatch(createReservation(ProductId.id, userId, checkInDate, checkOutDate, rooms, guests,products.price));
    };
    
    console.log("esto viene de recerba",auth.token.id)

    

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