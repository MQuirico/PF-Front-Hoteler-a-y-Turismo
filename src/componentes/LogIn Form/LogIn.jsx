import React, {useState} from 'react'
import NavBar from '../NavBar/navBar'

export default function LogIn (props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [esVálido, setEsVálido] = useState('')


    const userRegex = '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    //formato email 
    
    const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
    //debe contener al menos una mayúscula, una minúscula, un caracter especial, y un numero

    const handChangePass = (e) =>{
        setPassword(e.target.value)
    }
    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const validarBotonSubmit = () => {
        if (userRegex.test(userName) && passwordRegex.test(password)){
            setEsVálido(true);
        } else {
            setEsVálido(false)
        }
    }

    return (
        <>
        <NavBar />
        <h2>Inicie sesión</h2>
        <form>
            <label>Email:</label>
            <input type='text' value={userName} onChange={handleChange} placeholder='Escriba aquí su nombre de usuario'></input>
            <label>Contraseña:</label>
            <input type='password' value={password} onChange={handChangePass} placeholder='Y aquí su contraseña...'></input>
            <button type="submit" disabled={!esVálido}>Iniciar Sesión</button>
        </form>
        </>
    )
}