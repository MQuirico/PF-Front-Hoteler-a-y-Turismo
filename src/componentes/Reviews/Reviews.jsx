import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import style from "./Reviews.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postReviews } from '../../redux/actions/actions';

const BasicRating = () => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState('');
  const user = useSelector(state => state.userDataSession);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Intenta obtener el userId del estado de Redux, si no está disponible, busca en localStorage
  const userId = user?.userData?.googleId || user?.userData?.id || JSON.parse(localStorage.getItem('auth'))?.userData?.googleId;

  const idKey = id;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(postReviews(userId, idKey, value, review));
    } else {
      console.error('User ID is undefined');
      // Aquí puedes manejar el caso en que el User ID es undefined
      // Por ejemplo, podrías mostrar un mensaje al usuario o redirigirlo al inicio de sesión
    }
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <>
      <div className={style.container}>
        <Form className={style.containerContent} onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <h4>PRODUCTS REVIEWS</h4>
            <br />
            <div className={style.userContent}>
              {user && user.userData && user.userData.imageUrl && (
                <img src={user.userData.imageUrl} style={{ borderRadius: "50%", height: '34px', width: '34px'}} alt="user-avatar" />
              )}
              <h4>{user && user.userData ? user.userData.name : 'You must log in or create an account to post a review.'}</h4>
            </div>
            <br />
            <div className={style.ratingContainer}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }} 
              />
              <span>{value}</span>
            </div>
          </Form.Group>
          <Form.Group controlId="review" className={style.container}>
            <textarea
              className="form-control"
              style={{ width: '400px' }}
              value={review}
              cols="800"
              onChange={handleChange}
              placeholder="Write your appreciation of the product and your purchasing experience here"
            ></textarea>   
            <button variant="primary" type="submit">
              <h5>Send</h5>
            </button>
          </Form.Group>
        </Form>
        <hr style={{ width: '1000px', display: 'flex' }} />
        <div>
          <h4>OTHER REVIEWS</h4>
        </div>
      </div>
    </>
  );
};

export default BasicRating;