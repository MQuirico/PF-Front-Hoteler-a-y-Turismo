import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Register.module.css";
import { registerUser } from "../../redux/actions/actions";
import UserList from "./UserList";

const Register = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    surName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [createdUsersList, setCreatedUsersList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    const nameRegex = /^[A-Z][a-z]{0,9}( [A-Z][a-z]{0,9})?$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "The name should only contain letters, start with an uppercase letter, and have a maximum of 10 characters. Example: John";
    }

    const surNameRegex = /^[A-ZÑñ][a-zñ]{0,9}( [A-ZÑñ][a-zñ]{0,9})?$/;
    if (formData.surName && !surNameRegex.test(formData.surName)) {
      newErrors.surName =
        "The last name should only contain letters, start with an uppercase letter, and have a maximum of 10 characters. Example: Doe";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[@.])[a-zA-Z0-9@.]{6,12}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "The password must contain 6 to 12 characters, including at least one uppercase letter and a special character. Example: Password@";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "The email address is not valid or is empty. Example: user@example.com";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (datauser) => {
    dispatch(registerUser(datauser));
    alert("Successful registration");
    setFormData(initialFormData);
    setErrors({});
    setIsFormValid(false);
    setCreatedUsersList((prevList) => {
      const updatedList = [...prevList, datauser];
      localStorage.setItem("createdUsersList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <label htmlFor="surName">surName:</label>
        <input
          type="text"
          id="surName"
          name="surName"
          placeholder="Enter Your Last Name"
          value={formData.surName}
          onChange={handleChange}
        />
        {errors.surName && (
          <span className={styles.error}>{errors.surName}</span>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <label htmlFor="password">Password:</label>
        <div className={styles.passwordInputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter a Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showHideButton}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )}

        <button
          type="button"
          onClick={() => handleSubmit(formData)}
          className={`${styles.button} ${
            !isFormValid ? styles.buttonDisabled : ""
          }`}
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>

      <div className={styles.userCardsContainer}>
        <UserList users={createdUsersList} />
      </div>
    </div>
  );
};

export default Register;
