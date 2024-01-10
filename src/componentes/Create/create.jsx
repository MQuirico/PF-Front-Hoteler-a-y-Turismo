import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions/actions";
import validation from "../Validaciones/validaciones";
import "./create.css";
import { Link } from "react-router-dom";
import Select from "react-select";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    model: "",
    brand: "",
    size: "",
    image: "",
    color: "",
    price: "",
  });
  const [imageUrl, setImageUrl] = useState(""); // Agregado estado para imageUrl

  const handleValidation = () => {
    const newErrors = validation(input);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, options } = event.target;
  
    // Manejar múltiples selecciones si el campo es 'size'
    if (name === 'size') {
      const selectedSizes = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
  
      setInput((prevInput) => ({ ...prevInput, [name]: selectedSizes }));
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: event.target.value }));
    }
  
    // Actualizar imageUrl si el campo es 'image'
    if (name === 'image') {
      setImageUrl(event.target.value);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        dispatch(postProduct(input));
        setMessage("Producto creado exitosamente.");

        setInput({
          model: "",
          brand: "",
          size: "",
          image: "",
          color: "",
          price: "",
        });
        setImageUrl(""); // Reiniciar imageUrl
      } catch (error) {
        console.error("Error al crear el producto:", error);
        setMessage(
          "Error al crear el producto. Por favor, inténtalo de nuevo."
        );
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
    }
  };

  const availableBrands = ["nike", "adidas", "newbalance"]; // Hardcodeo de las marcas
  const brandColors = {
    nike: ["green", "white", "black"],
    adidas: ["blue", "white", "grey"],
    newbalance: ["black", "white", "red"],
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({ ...prevInput, brand: selectedBrand }));
  };


  const sizeOptions = [
    { value: "7", label: "7" },
    { value: "7.5", label: "7.5" },
    { value: "8", label: "8" },
    { value: "8.5", label: "8.5" },
    { value: "9", label: "9" },
    { value: "9.5", label: "9.5" },
    { value: "10", label: "10" },
    { value: "10.5", label: "10.5" },
    { value: "11", label: "11" },
    { value: "11.5", label: "11.5" },
    { value: "12", label: "12" },
  ];

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({ ...prevInput, size: selectedSizes }));
  };

  return (
    <div className="container">
      <div className="form-and-preview-container">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label">Modelo</label>
          <input
            type="text"
            value={input.model}
            name="model"
            placeholder="Modelo..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          <p className="error-message">{errors.model}</p>
  
          <label className="form-label">Marca</label>
          <select
            value={input.brand}
            name="brand"
            onChange={(e) => {
              handleBrandChange(e);
              handleChange(e);
            }}
            className="form-input"
          >
            <option value="" disabled>
              Selecciona una marca
            </option>
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <p className="error-message">{errors.brand}</p>
  
          <label className="form-label">Tamaños</label>
          <Select
            isMulti
            options={sizeOptions}
            value={sizeOptions.filter((option) => input.size.includes(option.value))}
            onChange={handleSizeChange}
          />
          <p className="error-message">{errors.size}</p>


       <label className="form-label">Imagen</label>
         <input
           type="text"
           value={input.image}
           name="image"
           placeholder="URL de la imagen..."
           onChange={(e) => handleChange(e)}
           className="form-input"
         />
         <p className="error-message">{errors.image}</p>

       <label className="form-label">Colores</label>
         <select
           value={input.color}
           name="color"
           onChange={(e) => handleChange(e)}
           className="form-input"
         >
           <option value="" disabled>
             Selecciona un color
           </option>
           {brandColors[input.brand] &&
             brandColors[input.brand].map((color) => (
               <option key={color} value={color}>
                 {color}
               </option>
             ))}
         </select>
         <p className="error-message">{errors.color}</p>

       <label className="form-label">Precio en USD$</label>
         <input
           type="text"
           value={input.price}
           name="price"
           placeholder="Precio..."
           onChange={(e) => handleChange(e)}
           className="form-input"
         />
         <p className="error-message">{errors.price}</p>
  
          <button type="submit" className="submit-button">
            Crear Producto
          </button>
  
          {message && (
            <div
              className={
                message.includes("éxito") ? "success-message" : "error-message"
              }
            >
              {message}
            </div>
          )}
  
          <div>
            <Link to="/home">
              <button className="submit-button">Volver a Home</button>
            </Link>
          </div>
        </form>
  
        <div className="preview-container">
          <div className="nombre">
            <h3>{input.model ? input.model : "Nombre..."}</h3>
          </div>
          <div className="image-preview">
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview-image" />
            )}
          </div>
          <p className="feactures-container">
            
          </p>
          <div className="tipos">
            <p className="titulo">Colores disponibles:</p>
            <p>{brandColors[input.brand]?.join(", ")}</p>
          </div>
          <div className="tipos">
            <p className="titulo"> Talles seleccionados</p>
          {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"].map((size) => (
            <span
              key={size}
              className={`size-item ${input.size.includes(size) ? 'selected' : ''}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </span>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;