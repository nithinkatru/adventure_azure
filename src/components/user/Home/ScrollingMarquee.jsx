// src/components/user/Home/ScrollingMarquee.jsx
import React from 'react';
import { Box, styled } from '@mui/material';


const MarqueeWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  height: '8rem',           
  backgroundColor: '#fff',  
});



const MarqueeInner = styled(Box)({
  display: 'inline-block',
  whiteSpace: 'nowrap',
  animation: 'marquee 60s linear infinite',
  fontSize: '6rem',  
  fontWeight: 700,
  textTransform: 'uppercase',
});


const marqueeKeyframes = `
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
`;


if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = marqueeKeyframes;
  document.head.appendChild(styleSheet);
}

export default function ScrollingMarquee() {

  const repeatedText = Array.from({ length: 10 }, (_, i) => (
    <Box key={i} component="span" sx={{ display: 'inline-block', mr: 4 }}>
      <span style={{ color: '#FFD700', marginRight: '1rem' }}>SHOP</span>
      <span
        style={{
          WebkitTextStroke: '1px #444',
          WebkitTextFillColor: 'transparent',
        }}
      >
        OWSLA X SOVRN
      </span>
    </Box>
  ));

  return (
    <MarqueeWrapper>
      <MarqueeInner>
        {repeatedText}
      </MarqueeInner>
    </MarqueeWrapper>
  );
}
