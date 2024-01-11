import React, {useState} from 'react';
import NavBar from '../NavBar/navBar';

export default function Registro (props) {
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [esVálido, setEsVálido] = useState('')

    const userRegex = '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    //formato email 

    const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
    //debe contener al menos una mayúscula, una minúscula, un caracter especial, y un numero


    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleSnChange = (e) =>{
        setSurName(e.target.value)
    }
    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const validarBotonSubmit = () => {
        if (userRegex.test(email) && passwordRegex.test(password) && typeof name === 'string' && typeof surName ==='string'){
            setEsVálido(true);
        } else {
            setEsVálido(false)
        }
    }


    return (
        <>
        <NavBar />
        <h2>Complete los datos solicitados para registrarse:</h2>
        <form>
            <label>Nombre:</label>
            <input type='text' value={name} onChange={handleNameChange} placeholder='Ingrese aquí su nombre de pila...'></input>
            <label>Apellido:</label>
            <input type='text' value={surName} onChange={handleSnChange} placeholder='Ingrese aquí su apellido...'></input>
            <label>Email:</label>
            <input type='text' value={email} onChange={handleEmailChange} placeholder='Ingrese aquí su email...'></input>
            <label>Password:</label>
            <input type='text' value={password} onChange={handlePasswordChange} placeholder='Ingrese aquí su contraseña...'></input>
            <button type='submit' disabled={!esVálido}>Registrarme</button>
        </form>
        </>
    )
}

//CAMBIO