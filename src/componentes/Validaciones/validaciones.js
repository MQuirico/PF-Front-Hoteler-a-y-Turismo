const validation = (input, existingNames) => {
  let errors = {};

  const noEmpty = /\S+/;
  const validateName = /^[a-zA-ZñÑ\s]*$/;
  const validateNum = /^\d+$/;
  // Esta expresión regular valida rutas de archivos con extensiones comunes de imagen
  const validateImagePath = /^(\.\/)?([\w\s]+\/)*[\w\s]+(\.(jpg|jpeg|png|gif|bmp|svg))$/i;

  if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.trim().length < 3) {
    errors.name = "Nombre necesario. Mayor de 3 letras y único";
  } else if (Array.isArray(existingNames) && existingNames.some((name) => name.toLowerCase() === input.name.toLowerCase())) {
    errors.name = "Este nombre ya está en uso. Por favor, elige otro.";
  }

  // Asumiendo que input.images es un array de rutas de archivos de imagen
  if (Array.isArray(input.images)) {
    input.images.forEach((image, index) => {
      if (!validateImagePath.test(image)) {
        errors[`image${index}`] = "Ruta de archivo inválida o no es una imagen";
      }
    });
  } else {
    errors.images = "Se esperaba un array de imágenes";
  }

  if (!validateNum.test(input.price) || parseFloat(input.price) < 1 || parseFloat(input.price) > 10000) {
    errors.price = "Ingrese un precio entre 1 y 10000";
  }

  return errors;
};

export default validation;