import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button 
          variant="primary" 
          className="scroll-to-top rounded-circle" 
          onClick={scrollToTop} 
          style={{
            width: '42px',
            height: '42px',
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            fontWeight: '700'
          }}>
           &#9650;
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;