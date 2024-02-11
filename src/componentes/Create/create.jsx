
import * as React from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import './create.css'
import {useDispatch} from 'react-redux';
import UploadWidget from './uploadWidget'
import { newHotel } from '../../redux/Actions/actions';

export const formContext = React.createContext()

export default function NewService (){


    const dispatch = useDispatch()

    const styles = {
        autocomplete: {
          width: '40%',
          marginBottom: '10px',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff', // Color de fondo blanco
          },
          '& .MuiOutlinedInput-input': {
            color: '#000', // Color del texto negro
          },
        },
      };

    const {register, formState: { errors }, watch, reset, control, setValue ,handleSubmit} = useForm(); 


    const seasons = [
        { value: 'verano', label: 'Verano' },
        { value: 'invierno', label: 'Invierno' },
        { value: 'primavera', label: 'Primavera' },
        { value: 'otoño', label: 'Otoño' }
      ]; //safdsadsa

      const locations = [
        'El Bolsón, Provincia de Río Negro',
        'Villa Pehuenia, Provincia de Neuquén',
        'Purmamarca, Provincia de Jujuy',
        'Villa Traful, Provincia de Neuquén',
        'Las Grutas, Provincia de Río Negro',
        'San Javier, Provincia de Tucumán',
        'Los Reartes, Provincia de Córdoba',
        'Caviahue, Provincia de Neuquén',
        'Tafí del Valle, Provincia de Tucumán',
        'Villa Meliquina, Provincia de Neuquén',
        'San Marcos Sierras, Provincia de Córdoba',
        'Cuesta Blanca, Provincia de Córdoba',
        'El Soberbio, Provincia de Misiones',
        'Villa General Roca, Provincia de Córdoba',
        'Colonia Suiza, Provincia de Río Negro',
        'San Antonio de los Cobres, Provincia de Salta',
        'Tilcara, Provincia de Jujuy',
        'El Condor, Provincia de Río Negro',
        'Villa Yacanto, Provincia de Córdoba',
        'Cholila, Provincia de Chubut',
        'Villa La Angostura, Provincia de Neuquén',
        'Santa Ana, Provincia de Misiones',
        'Las Rabonas, Provincia de Córdoba',
        'Yavi, Provincia de Jujuy',
        'Villa Ciudad Parque Los Reartes, Provincia de Córdoba',
        'Villa Cura Brochero, Provincia de Córdoba',
        'Villa Berna, Provincia de Córdoba',
        'Los Molles, Provincia de San Luis',
        'Los Alerces, Provincia de Chubut',
        'Nono, Provincia de Córdoba',
        'Lago Puelo, Provincia de Chubut',
        'La Cumbrecita, Provincia de Córdoba',
        'San Pedro de Colalao, Provincia de Tucumán',
        'Villa Lago Meliquina, Provincia de Neuquén',
        'Los Hornillos, Provincia de Córdoba',
        'Villa Quila Quina, Provincia de Neuquén',
        'Capilla del Monte, Provincia de Córdoba',
        'El Chocón, Provincia de Neuquén',
        'Maimará, Provincia de Jujuy',
        'Miramar, Provincia de Córdoba',
        'Villa Giardino, Provincia de Córdoba',
        'El Mollar, Provincia de Tucumán',
        'El Hoyo, Provincia de Chubut',
        'Yacanto de Calamuchita, Provincia de Córdoba',
        'Villa Ventana, Provincia de Buenos Aires',
        'San Roque, Provincia de Córdoba',
        'Villa de Las Rosas, Provincia de Córdoba',
        'El Maitén, Provincia de Chubut',
        'San José de la Dormida, Provincia de Córdoba',
        'Merlo, Provincia de San Luis',
        'Potrerillos, Provincia de Mendoza'
    ];

    

    const onSubmit = (data) => {
        console.log(data)
        dispatch(newHotel(data))
        reset()
        console.log(data)
    };
    
    const handleKeyPressPr = (event) => {
        if (!/[0-9]/.test(event.key) || event.target.value.length >= 6) {
           event.preventDefault();
        }
       };

    const handleKeyPressRooms = (event) => {
        if (!/[0-9]/.test(event.key) || event.target.value.length >= 2) {
           event.preventDefault();
        }
       };
       
    const selectedSeasons = watch('season', []);

    const handleSeasonChange = (selectedOptions) => {
        setValue('season', selectedOptions); // Actualizamos el valor del campo 'season'
      };


    return(
        <div>
        <h3>Formulario de alta de servicios de hospedaje:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Indique las estaciones del año idóneas para el alquiler de este servicio de hospedaje:</label>
            <br></br>
            <Select
            isMulti
            options={seasons}
            {...register('season', { required: true })}
            value={selectedSeasons}
            onChange={handleSeasonChange}
            placeholder="Selecciona las estaciones"
            styles={{
        option: (provided, state) => ({
            ...provided,
            color: 'black' 
        }),
        control: (provided, state) => ({
            ...provided,
            width: '40%' 
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '40%' 
        })
    }}
            />
            <br></br>
            {errors.season?.type === 'required' && <p className="error">**Campo requerido**</p>}
            <br></br>

            <label>Título de la publicación:</label>
            <br></br>
            <input type='text' {...register('name', { required: true, maxlength: 50 })}></input>
            <br></br>
            {errors.name?.type === 'required' && <p className="error">Ingrese un título para su publicación</p>}
            <br></br>

            <label>Indique la localidad donde se ubica el servicio a publicar:</label>
            <br></br>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={locations}
                sx={{ width: 40 }}
                renderInput={(params) => <TextField {...params} label="Localidad" />}
                onChange={(event, newValue) => {
                setValue('location', newValue);
                }}    
                style={styles.autocomplete}            
                />
            <br></br> 
            
            
            <label>Indique el precio por noche para el hospedaje a publicar</label>
            <br></br>
            <input type='number' onKeyPress={handleKeyPressPr} {...register('pricePerNight', { required: true })}></input>
            <br></br>
            {errors.pricePerNight?.type === 'required' && <p className="error">Ingrese un precio por noche para el hospedaje a publicar</p>}


            <label>¿Qué cantidad de habitaciones alberga el hospedaje a publicar?</label>
            <br></br>
            <input type='number' onKeyPress={handleKeyPressRooms}{...register('totalRooms', {required: true})}></input>
            <br></br>
            {errors.totalRooms?.type === 'required' && <p className="error">Ingrese la cantidad de habitaciones con las que cuenta el hospedaje a publicar</p>}
            

            <label>¿Posee piscina?</label>
            
            <p style={{ color: "black" }}>Sí</p>
            <input type="radio" name="pool" value={true} {...register('pool',{ required: true })}></input>
            <p style={{ color: "black" }}>No</p>
            <input type="radio" name="pool" value={false} ></input>
            <br></br>
            {errors.pool?.type === 'required' && <p className="error">Ingrese si el hospedaje a publicar cuenta con pileta</p>}
            
            <label>Agregue aquí imágenes sobre el hospedaje</label>   
            <br></br>
            <formContext.Provider value={{ setValue }}>
            <UploadWidget />    
            </formContext.Provider>
            <br></br>
            <br></br>
            <button type='submit'>Publicar</button>
        </form>
        </div>
    )
}
