import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography, IconButton, Avatar } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import profileImg from '../assets/background.jpg';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const testimonials = [
    { id: 1, image: profileImg, text: "Great service! Highly recommended." },
    { id: 2, image: "/path_to_your_image2.jpg", text: "Awesome experience! Will definitely come back." },
    
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '90px', paddingBottom: '100px' }}>
      <Typography variant="h2" gutterBottom style={{ fontWeight: 400 }}>
        Testimonial
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        
          <IconButton aria-label="previous" onClick={handlePrevious} style={{ marginRight: '60px' }}>
            {'<'} 
          </IconButton>
          <Avatar alt="Testimonial Image" src={testimonials[currentIndex].image} sx={{ width: 100, height: 100 }} />
          <IconButton aria-label="next" onClick={handleNext} style={{ marginLeft: '60px' }}>
            {'>'} 
          </IconButton>
        </div>
        <Typography variant="body1" gutterBottom style={{ marginTop: '50px' }}>
          {testimonials[currentIndex].text}
        </Typography>
      </div>
    </div>
  );
}