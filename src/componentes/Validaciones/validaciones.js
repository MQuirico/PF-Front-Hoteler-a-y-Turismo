const validation = (input, existingNames) => {
  let errors = {};

  const noEmpty = /\S+/;
  const validateName = /^[a-zA-ZñÑ\s]*$/;
  const validateNum = /^\d+$/;
  const validateUrl = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/;

  if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.trim().length < 3) {
    errors.name = "Nombre necesario. Mayor de 3 letras y único";
  } else if (Array.isArray(existingNames) && existingNames.some((name) => name.toLowerCase() === input.name.toLowerCase())) {
    errors.name = "Este nombre ya está en uso. Por favor, elige otro.";
  }

  if (!validateUrl.test(input.image)) {
    errors.image = "URL inválida o no cumple con el patrón requerido";
  }

  if (!validateNum.test(input.price) || parseFloat(input.price) < 1 || parseFloat(input.price) > 10000) {
    errors.price = "Ingrese un precio entre 1 y 10000";
  }

  return errors;
};

export default validation