import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./card.css"; // Importa el archivo CSS donde definiste la clase

const CustomCard = ({ id, name, location, season, pricePerNight, images, highlight, cardWidth, cardHeight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="ddddd" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div elevation={3} style={{ width: cardWidth, height: cardHeight }}>
        <Box position="relative">
          <CardActionArea component={Link} to={`/detail/${id}`} className={highlight ? "highlight" : ""}>
            <CardMedia
              component="img"
              width="200px"
              height="350px"
              image={images[currentImageIndex]}
              alt={name}
            />
          </CardActionArea>
          {hovered && (
            <Box position="absolute" top="50%" left={0} transform="translateY(-50%)">
              <IconButton onClick={handlePreviousImage} style={{ fontSize: "32px", color: "red" }}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          )}
          {hovered && (
            <Box position="absolute" top="50%" right={0} transform="translateY(-50%)">
              <IconButton onClick={handleNextImage} style={{ fontSize: "48px", color: "red" }}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <CardContent className="transparent-background">
          <Typography gutterBottom variant="h4" component="div" borderBottom="1px solid black" color= "black" padding= "10px">
            {name}
          </Typography>
          <Typography  variant="body2" color="black" component="p" fontWeight="bold" fontSize="20px">
            {location}
          </Typography>
          <Typography variant="body2" color="black" component="p">
            Temporada: {season.join(", ")}
          </Typography>
          <Typography variant="body2" color="green" component="p" fontWeight="bold">
            Precio por noche: {pricePerNight} $ ars
          </Typography>
        </CardContent>
      </div>
      <div className="dots-container">
        {images.map((img, index) => (
          <div key={index} className={`dot ${index === currentImageIndex ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
};

export default CustomCard;