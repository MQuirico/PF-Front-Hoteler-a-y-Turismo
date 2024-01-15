import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '150px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Slide = () => (
  <Carousel autoplay style={{width: '30%', height: '80%', 'margin-top': '450px', 'margin-left': '505px'}}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
export default Slide;