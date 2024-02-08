import  { useState } from 'react';

import style from './ImageGallery.module.css'
const ImageGallery = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0); 

  const handleNext = () => {
    if (startIndex + 4 < images.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const handlePrev = () => {
    
    if (startIndex - 4 >= 0) {
      setStartIndex(startIndex - 4);
    }
  };

  return (
    <section className={style.container}>
      
     {startIndex ===0?'': <button onClick={handlePrev} className={style.boton} >Ant</button>}
      {images.slice(startIndex, startIndex + 4).map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Imagen${startIndex + index + 1}`}
        />
      ))}
   <button onClick={handleNext} className={style.boton} disabled={startIndex + 4 >= images.length}>Sig</button>
    </section>
  );
}

export default ImageGallery;