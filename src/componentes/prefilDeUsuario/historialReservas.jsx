import React, { useState, useEffect, useContext } from 'react';
import './historialReservas.css';
import axios from 'axios';
import moment from 'moment';
import { getAllProducts } from '../../redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../AuthProvider/authProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Reservas = () => {
  const { auth } = useContext(AuthContext);
  const [reservations, setReservations] = useState(null);
  const products = useSelector((state) => state?.stateA?.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    axios.get(`https://back-hostel.onrender.com/recervas/getByUserID/${auth?.token?.id}`)
      .then((response) => {
        if (response.data) {
          setReservations(response.data);
        }
      });
  }, [auth.token.id, dispatch]);

  const reserID = reservations?.map((res) => res.productId);

  let prodRes = products.filter((p) => reserID?.includes(p.id));

  let objetosFiltrados = [];

  reserID?.forEach((id) => {
    let prod = prodRes?.find((pr) => pr.id === id);
    let rese = reservations?.find((re) => re.productId === id);

    if (prod && rese) {
      let objResult = {
        name: prod.name.toUpperCase(),
        location: prod.location.toUpperCase(),
        startDate: moment(rese.startDate).format('DD-MM-YYYY'),
        endDate: moment(rese.endDate).format('DD-MM-YYYY'),
        totalGuests: rese.totalGuests,
      };
      objetosFiltrados.push(objResult);
    }
  });

 const rows = ["Hospedaje", "Distrito", "Fecha Ingreso", "Fecha Salida", "Huéspedes"];

  if (reservations) {
    return (
      <div id="container" style={{
        overflowX: "hidden",
        overflowY: "hidden",
        height: "89vh",
        width: "174vh",
        display: "flex",
        marginTop: "6.1vh",
        gap: "1vh",
        backgroundImage: "url(https://www.minimalstudio.es/wp-content/uploads/2022/02/caracteristicas-de-la-arquitectura-minimalista-minimal-studio.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              {rows.map((row, index) => (
                  <TableCell sx={{ width: 10 }} key={index}>
                    {row.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {objetosFiltrados.map((reserva, index) => (
                <TableRow key={index}>
                  <TableCell>{reserva.name}</TableCell>
                  <TableCell>{reserva.location}</TableCell>
                  <TableCell>{reserva.startDate}</TableCell>
                  <TableCell>{reserva.endDate}</TableCell>
                  <TableCell>{reserva.totalGuests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div>No hay reservas disponibles.</div>;
  }
};

export default Reservas;
