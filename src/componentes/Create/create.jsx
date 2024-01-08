import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../redux/actions/actions"; 
import validation from "../Validaciones/validaciones";
import "./create.css";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const brands = useSelector((state) => state.brands); // Reemplaza con tu selector real
  const [input, setInput] = useState({
    name: "",
    brand: "",
    size: "",
    image: "",
    description: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleValidation = () => {
    const newErrors = validation(input); // Asegúrate de tener la función de validación adecuada
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));

    if (name === "image") {
      setImageUrl(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        dispatch(postProduct(input)); // Asegúrate de tener la acción correcta
        setMessage("Producto creado exitosamente.");

        // Limpiar el formulario después de la creación exitosa
        setInput({
          name: "",
          brand: "",
          size: "",
          image: "",
          description: "",
        });
        setImageUrl(""); // Limpiar la URL de la imagen
      } catch (error) {
        console.error("Error al crear el producto:", error);
        setMessage("Error al crear el producto. Por favor, inténtalo de nuevo.");
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
    }
  };

  return (
    <div className="container">
      <form className="product-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          value={input.name}
          name="name"
          placeholder="Nombre..."
          onChange={(e) => handleChange(e)}
          className="form-input"
        />
        <p className="error-message">{errors.name}</p>

        <label className="form-label">Marca</label>
        <select
  value={input.brand}
  name="brand"
  onChange={(e) => handleChange(e)}
  className="form-input"
>
  <option value="" disabled>
    Selecciona una marca
  </option>
  {brands && brands.map((brand) => (
    <option key={brand.id} value={brand.id}>
      {brand.name}
    </option>
  ))}
</select>
        <p className="error-message">{errors.brand}</p>

        <label className="form-label">Tamaño</label>
        <input
          type="text"
          value={input.size}
          name="size"
          placeholder="Tamaño..."
          onChange={(e) => handleChange(e)}
          className="form-input"
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

        <label className="form-label">Descripción</label>
        <textarea
          value={input.description}
          name="description"
          placeholder="Descripción..."
          onChange={(e) => handleChange(e)}
          className="form-input"
        />
        <p className="error-message">{errors.description}</p>

        <button type="submit" className="submit-button">
          Crear Producto
        </button>

        {message && (
          <div className={message.includes("éxito") ? "success-message" : "error-message"}>
            {message}
          </div>
        )}

        <div>
          <Link to="/home">
            <button className="submit-button">Volver a Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;