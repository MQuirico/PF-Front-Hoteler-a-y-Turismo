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
    name: "",
    brand: "",
    size: [],
    image: "",
    color: [],
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
          name: "",
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

  const availableBrands = ["nike", "adidas", "newbalance"];
  const brandColors = {
    nike: ["green", "white", "black"],
    adidas: ["blue", "white", "grey"],
    newbalance: ["black", "white", "red"],
  };
  
  const colorOptions = [
    { value: "all", label: "Todos" },
    ...brandColors[input.brand]?.map((color) => ({
      value: color,
      label: color,
    })) || []
  ]
  
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      brand: selectedBrand,
      color: [], // Restablecer los colores al cambiar la marca
    }));
  };
  
  const handleColorChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      color: selectedColors.includes("all")
        ? brandColors[prevInput.brand] || []
        : selectedColors.filter((color) =>
            brandColors[prevInput.brand]?.includes(color)
          ),
    }));
  };


  const sizeOptions = [
    { value: "all", label: "Todos" },
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
    // Verificar si la opción "all" está seleccionada
    const isAllSelected = selectedOptions.some((option) => option.value === "all");
  
    // Si "all" está seleccionada, establecer todos los tamaños
    // de lo contrario, usar map para obtener solo los valores seleccionados
    const selectedSizes = isAllSelected
      ? sizeOptions.filter((option) => option.value !== "all").map((option) => option.value)
      : selectedOptions.map((option) => option.value);
  
    setInput((prevInput) => ({
      ...prevInput,
      size: selectedSizes,
    }));
  };


  const colorStyles = {
    green: { backgroundColor: 'green', color: 'white' },
    white: { backgroundColor: 'white', color: 'black' },
    black: { backgroundColor: 'black', color: 'white' },
    blue: { backgroundColor: 'blue', color: 'white' },
    grey: { backgroundColor: 'grey', color: 'white' },
    red: { backgroundColor: 'red', color: 'white' },
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
          <p className="error-message">{errors.name}</p>

          <label className="form-label">Precio en USD$</label>
          <input
          type="number"
          value={input.price}
          name="price"
          placeholder="Precio..."
          onChange={(e) => {
          // Validar y convertir a número
          const value = parseFloat(e.target.value) || 0;
          handleChange({ target: { name: "price", value } });
        }}
          min="1"
          step="any" // Permite números decimales
          className="form-input"/>

          <p className="error-message">{errors.price}</p>
          
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
          <option value="" disabled>Selecciona una marca</option>
            {availableBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}
            </option>
              ))} 
            </select>
          <p className="error-message">{errors.brand}</p>
  
          <label className="form-label">Talles</label>
          <Select
          value={input.size.map((size) => ({ value: size, label: size }))}
           name="size"
           onChange={(selectedOption) => handleSizeChange(selectedOption)}
           isMulti
           options={sizeOptions}
            />
          <p className="error-message">{errors.size}</p>


       <label className="form-label">Colores</label>
          <Select
          value={input.color.map((color) => ({ value: color, label: color }))}
          name="color"
          onChange={handleColorChange}
          isMulti
          options={colorOptions}/>

          <p className="error-message">{errors.color}</p>



  
          <div className="button-container">
          <button type="submit" className="submit-button">
            Crear Producto
          </button>
          <Link to="/home">
            <button className="submit-button">Volver a Home</button>
          </Link>
        </div>
      
    
  


          {message && (
            <div className={ message.includes("éxito") ? "success-message" : "error-message"}>
            {message}
            </div>
            )}

        </form>
  
        <div className="preview-container">
          <div className="nombre">
            <h3>{input.model ? input.model : "Nombre..."}</h3>
          </div>

          
          <h4 className="precio-preview"> {input.price ? `USD $${input.price}` : "Precio..."}</h4>
          <p className="feactures-container"></p>

          <div className="image-preview">
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview-image" />
            )}
          </div>
          <p className="feactures-container"></p>

          <div className="tipos">
            <p className="titulo">Marca seleccionada</p>
            <div className="selected-sizes-container">
            <span className="selected-size">
            {input.brand ? input.brand : "Marca"}
            </span>
            </div>
            </div>

            <div className="tipos">
            <p className="titulo">Colores seleccionados</p>
            <div className="selected-sizes-container">

            {input.color.map((selectedColor, index) => (
            <span
            key={selectedColor}
            className="selected-size"
            style={colorStyles[selectedColor]}>
            {selectedColor}
            {index < input.color.length - 1 && (
            <span className="size-separator"></span>
        )}
      </span>
    ))}
  </div>

  </div>
          <div className="tipos">
          <p className="titulo">Talles seleccionados</p>
          <div className="selected-sizes-container">
            {input.size.map((selectedSize, index) => (
            <span key={selectedSize} className="selected-size">
            {selectedSize}
            {index < input.size.length - 1 && <span className="size-separator"></span>}
            </span>
    ))}
  </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

