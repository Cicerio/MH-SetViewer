import React, { useState, useRef, useEffect } from 'react';
import "../css/PopupWindow.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function PopupWindow({ children, isOpen, setIsOpen, windowHeader }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      //   setIsOpen(false);
      // }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div ref={wrapperRef} className="popup-window">
          <div className='popup-header'>
            <h4 className='popup-header-text'>{windowHeader}</h4>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="popup-window-content">
            {children}
          </div>
        </div>
      )}
    </>
  );
}