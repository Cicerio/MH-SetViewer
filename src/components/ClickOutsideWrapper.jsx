import React, { useState, useRef, useEffect } from 'react';

export default function ClickOutsideWrapper({ children, isOpen, setIsOpen }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>{isOpen && (
      <div ref={wrapperRef}>
        {children}
      </div>
    )}
    </>

  );
}