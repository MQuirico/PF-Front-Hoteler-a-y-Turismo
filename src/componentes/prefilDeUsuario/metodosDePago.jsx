import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserpay } from '../../../src/redux/Actions/actions';
import { AuthContext } from '../../componentes/AuthProvider/authProvider';
import { TextField, Button, Typography } from '@mui/material';
import styles from './metodosDePago.module.css';
import Diners from '../../../src/assets/diners.png';
import MasterCard from '../../../src/assets/mastercard.jpeg';
import Visa from '../../assets/visa.jpg';
import Naranja from '../../assets/naranja.jpg';
import Amex from "../../assets/Amex.jpeg";
import Cabal from '../../assets/caval.jpeg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';


const PaymentMethodsForm = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    paymentMethods: [],
    number: '',
    brand: '',
    expirationDate: '',
    cvv: '',
  });

  const [editMode, setEditMode] = useState({
    number: false,
    brand: false,
    expirationDate: false,
    cvv: false,
  });

  const [addPaymentError, setAddPaymentError] = useState(null);
  const [numberError, setNumberError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [brandImage, setBrandImage] = React.useState(null);
  const { register, formState: { errors }, setValue, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { loading = false, error: updateUserError = null } = useSelector(
    (state) => state.userDataSession || {}
  );


  useEffect(() => {
    if (auth && auth.token) {
      const { id, paymentMethods } = auth.token;
      setFormData({
        id: id || '',
        paymentMethods: paymentMethods || [],
        number: '',
        brand: '',
        expirationDate: '',
        cvv: '',
      });
    }
  }, [auth]);

  

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log('User disconnected.');
      });
    }

    setAuth(null);
    localStorage.removeItem('auth');
    history.push('/home');
  };

  const handleSaveClick = () => {
    const userId = formData.id;
    const { number, brand, expirationDate, cvv } = formData;

    dispatch(updateUserpay(userId, { number, brand, expirationDate, cvv }));

    const confirmationMessage = "Método de pago agregado con éxito. ¿Deseas salir de tu sesión?";
    const shouldLogOut = window.confirm(confirmationMessage);

    if (shouldLogOut) {
      logOut();
    }

    setEditMode({
      number: false,
      brand: false,
      expirationDate: false,
      cvv: false,
    });
  };

  const history = useHistory();


const handleChange = (e) => {
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/\D/g, '');
  inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1-');
  inputValue = inputValue.slice(0, 19);
  setFormData({ ...formData, number: inputValue });
};


  const onSubmit = (data, e) => {
    e.preventDefault();
    const toSend = {
      ...data,
      id: auth.token.id
    };
    console.log(toSend);
    dispatch(addPaymentMethod(toSend));

    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, '');
    });
  };

  const handleSelectChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);

    
    switch (selectedBrand) {
      case 'Visa':
          setBrandImage(Visa);
          break;
          case 'MasterCard':
              setBrandImage(MasterCard);
        break;
        case 'Naranja':
        setBrandImage(Naranja);
        break;
        case 'American Express':
            setBrandImage(Amex);
        break;
        case 'Diners Club':
        setBrandImage(Diners);
        break;
      case 'Cabal':
        setBrandImage(Cabal);
        break;
        default:
            setBrandImage(null);
        break;
    }
  };
  
  const handleChangeFecha = (e) => {
      let inputValue = e.target.value;
      inputValue = inputValue.replace(/\D/g, '');
      if (inputValue.length > 2) {
        inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
      }
      inputValue = inputValue.slice(0, 5);
      setFormData({ ...formData, expirationDate: inputValue });
    };

    const handleChangeCVV = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = inputValue.slice(0, 4);
        setFormData({ ...formData, cvv: inputValue });
      };



  return (
    <div style={{
        border: "1px solid black",
        marginTop: "100px",
        height: "720px",
        width: "850px",
        marginLeft: "300px",
        borderRadius: "10px",
        backgroundColor: "#ffffff4f", 
        boxShadow: "0 0 9px rgba(0, 0, 0, 0.7)", 
        marginBottom: "50px"
      }}>
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.fonde1}>
      <div className={styles.fonde}>
      <div className={styles.title}>
        <h4 className={styles.texttt}>Agrega un método de pago</h4>
      </div>
      <div className={styles.cont}>
      <div className={styles.conter}>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="number">
          Número de tarjeta:
        </label>
        <input
          className={styles.input}
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          disabled={!editMode.number}
          variant="outlined"
          size="small"
          />
        {numberError && <Typography className={styles.error}>{numberError}</Typography>}
        <Button type="button" onClick={() => handleEditClick('number')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="brand">
          Marca de tarjeta:
        </label>
        <select
          name="brand"
          value={formData.brand}
          onChange={(e) => {
            handleSelectChange(e);
            handleChange(e);
          }}
          
          className={styles.selectBox}
          >
          <option value="">Seleccione una opción</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Naranja">Naranja</option>
          <option value="American Express">American Express</option>
          <option value="Diners Club">Diners Club</option>
          <option value="Cabal">Cabal</option>
        </select>
        
      </div>
    

        <div className={styles.imageprev}>
        {brandImage && <img src={brandImage} alt="Marca de tarjeta" className={styles.brandImage} />}
        </div>
      

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="expirationDate">
          Fecha de vencimiento:
        </label>
        <input
          className={styles.input}
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChangeFecha}
          disabled={!editMode.expirationDate}
          variant="outlined"
          size="small"
          />
       
        <Button type="button" onClick={() => handleEditClick('expirationDate')} className={styles.editButton}>
          Editar
        </Button>
      </div>
          

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="cvv">
          Codigo de seguridad:
        </label>
        <input
          className={styles.input}
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChangeCVV}
          disabled={!editMode.cvv}
          variant="outlined"
          size="small"
          />
        {cvvError && <Typography className={styles.error}>{cvvError}</Typography>}
        <Button type="button" onClick={() => handleEditClick('cvv')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      </div>
      <Button type="submit" className={styles.saveButton}>
        Guardar Método de Pago
      </Button>
      </div>

      {addPaymentError && (
        <Typography className={styles.error}>Error al agregar el método de pago: {addPaymentError.toString()}</Typography>
        )}
      <div className={styles.submit}>

      </div>
        </div>
        </div>
    </form>
    </div>
  );
};

export default PaymentMethodsForm;