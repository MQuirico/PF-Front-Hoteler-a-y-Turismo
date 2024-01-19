import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validation from "../Validaciones/validaciones";
import "./create.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  postCreateProduct,
  clearCreateProductState,
} from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "@emotion/styled";
import ImageOptions from './ImageOptions';
import { v4 as uuidv4 } from 'uuid';
import ImageGallery from 'react-image-gallery';


const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [imageOptions, setImageOptions] = useState([{ id: uuidv4(), type: '', value: '', file: null }]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  



  const [input, setInput] = useState({
    name: "",
    brand: "",
    size: [],
    image: [],
    colors: [],
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const {
    createdProduct = null,
    loading,
    error,
  } = useSelector((state) => state.product || {});

  useEffect(() => {
    return () => {
      dispatch(clearCreateProductState());
    };
  }, [dispatch]);

  const handleValidation = () => {
    const newErrors = validation(input);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "size") {
      // Manejar cambios en el input de tallas si es necesario
    } else if (name === "image") {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
      setImageUrl(value);
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validation(input);
    setErrors(newErrors);

    console.log("Objeto input:", input);

    if (Object.keys(newErrors).length === 0) {
      try {
        const updatedInput = { ...input, image: [input.image] };
        await dispatch(postCreateProduct(updatedInput));
        setMessage("Producto creado exitosamente.");
        setInput({
          name: "",
          brand: "",
          size: [],
          image: [],
          colors: [],
          price: "",
        });
        setImageUrl("");
      } catch (error) {
        setMessage("Error al crear el producto");
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
    }
  };


  const availableBrands = ["Nike", "Adidas", "NewBalance"];
  const brandColors = {
    Nike: ["green", "white", "black"],
    Adidas: ["blue", "white", "grey"],
    NewBalance: ["black", "white", "red"],
  };

  const colorOptions = [
    { value: "all", label: "Todos" },
    ...(brandColors[input.brand] || []).map((color) => ({
      value: color,
      label: color,
    })),
  ];

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      brand: selectedBrand,
      color: [],
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

  const handleAllSizes = () => {
    const allSizes = sizeOptions.map((option) => option.value);

    if (input.size.includes("all")) {
      const newSizes = input.size.filter((size) => size !== "all");
      setInput((prevInput) => ({ ...prevInput, size: newSizes }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        size: allSizes.filter((size) => size !== "all"),
      }));
    }
  };

  const handleSizeChange = (selectedOptions) => {
    const isAllSelected = selectedOptions.some(
      (option) => option.value === "all"
    );

    if (isAllSelected) {
      handleAllSizes();
    } else {
      const selectedSizes = selectedOptions.map((option) => option.value);
      setInput((prevInput) => ({ ...prevInput, size: selectedSizes }));
    }
  };

  const handleAllColors = () => {
    const allColors = colorOptions.map((option) => option.value);

    if (input.colors.includes("all")) {
      const newColors = input.colors.filter((color) => color !== "all");
      setInput((prevInput) => ({ ...prevInput, colors: newColors }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        colors: allColors.filter((color) => color !== "all"),
      }));
    }
  };

  const handleColorInputChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);

    if (selectedColors.includes("all")) {
      handleAllColors();
    } else {
      setInput((prevInput) => ({ ...prevInput, colors: selectedColors }));
    }
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1));
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0));
  };

 
  const images = [
    {
      original: 'http://lorempixel.com/1000/600/nature/1/',
      thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/2/',
      thumbnail: 'http://lorempixel.com/250/150/nature/2/',
    },
    
   ];
   
   const MyComponent = () => <ImageGallery items={images} />;

  const colorStyles = {
    green: { backgroundColor: "green", color: "white" },
    white: { backgroundColor: "white", color: "black" },
    black: { backgroundColor: "black", color: "white" },
    blue: { backgroundColor: "blue", color: "white" },
    grey: { backgroundColor: "grey", color: "white" },
    red: { backgroundColor: "red", color: "white" },
  };

  return (
    <div className="fondo2">
      <div className="container">
        <div className="form-and-preview-container">
       
          <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <label className="form-label">Modelo</label>
            <input
              type="text"
              value={input.name}
              name="name"
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
                const value = parseFloat(e.target.value) || 0;
                handleChange({ target: { name: "price", value } });
              }}
              min="1"
              step="any"
              className="form-input"
            />
            <p className="error-message">{errors.price}</p>

            <label className="form-label">Imagen</label>
            <ImageOptions 
              imageOptions={imageOptions} 
              setImageOptions={setImageOptions} 
              imageUrls={imageUrls} 
              setImageUrls={setImageUrls} 
              imageFiles={imageFiles} 
              setImageFiles={setImageFiles} 
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
              <option value="" disabled className="colormarca">
                Selecciona una marca
              </option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
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
              value={input.colors.map((color) => ({
                value: color,
                label: color,
              }))}
              name="colors"
              onChange={handleColorInputChange}
              isMulti
              options={colorOptions}
            />
          <p className="error-message">{errors.colors}</p>

          <div className="button-container">
          <button type="submit" className="submit-button">
            Crear
          </button>
        </div>
          <div className="successMessage">
          {message && (
            <div className={ message.includes("éxito") ? "success-message" : "error-message"}>
            {message}
            </div>
            )}
            </div>

        </form>
        

        <div className="preview-container">
          <div className="nombre">
            <h3>{input.name ? input.name : "Nombre..."}</h3>
          </div>

            <h4 className="precio-preview">
              {" "}
              {input.price ? `USD $${input.price}` : "Precio..."}
            </h4>
            <p className="feactures-container"></p>

            <div className="image-preview-container">
            
            {imageUrls.length > 0 && (
            <div className="image-container">
            {imageUrls.length > 1 && <button className="nav-button left" onClick={goToPreviousImage}>&lt;</button>}
            <img src={imageUrls[currentImageIndex]} alt="Preview" className="preview-image" />
            {imageUrls.length > 1 && <button className="nav-button right" onClick={goToNextImage}>&gt;</button>}
              </div>
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
                {input.colors.map((selectedColor, index) => (
                  <span
                    key={selectedColor}
                    className="selected-size"
                    style={colorStyles[selectedColor]}
                  >
                    {selectedColor}
                    {index < input.colors.length - 1 && (
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
                    {index < input.size.length - 1 && (
                      <span className="size-separator"></span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;