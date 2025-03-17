import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${visible ? 'visible' : 'hidden'}`}>
      {message}
    </div>
  );
};

export default Toast;