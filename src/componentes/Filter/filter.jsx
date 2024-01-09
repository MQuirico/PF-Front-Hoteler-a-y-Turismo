import React from 'react';
import {useSelector} from 'redux';


export default function Filtros (props){
  return(
    <div>
        <label>Seleccione una marca</label>
        <input type='checkbox' value={value}>Adidas</input>
        <input type='checkbox' value={value}>Puma</input>
        <input type='checkbox' value={value}>LeCoqSportif</input>
        <input type='checkbox' value={value}>Nike</input>
        <input type='checkbox' value={value}>Topper</input>
    </div>
  )
}

