import React, { useEffect, useState } from 'react';
import './footer.css';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isScrolledToBottom) {
        setShowFooter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-dark text-center text-lg-start ${
        showFooter ? 'visible' : 'hidden'
      }`}
    >
      <div className="footer text-center p-3">
        © 2023 Copyright: GamerHub.com
      </div>
    </footer>
  );
};

export default Footer;