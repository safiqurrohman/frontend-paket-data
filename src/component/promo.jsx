import { useEffect, useState } from 'react';
import promo1 from '../assets/img/promo1.jpg';
import promo2 from '../assets/img/promo2.jpg';
import promo3 from '../assets/img/promo1.jpg';
import promo4 from '../assets/img/promo3.jpg';
import promo5 from '../assets/img/promo1.jpg';

const images = [promo1, promo2, promo3, promo4, promo5];

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-fluid text-center" >
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="rounded"
        style={{ height: '300px', width: '500px', borderRadius: '20px', transition: 'all 0.5s ease' }}
      />
    </div>
  );
}
