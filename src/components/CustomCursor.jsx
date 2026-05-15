import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shortcut: Ctrl + Shift + 3
      // Using code for better reliability across layouts
      if (e.ctrlKey && e.shiftKey && (e.code === 'Digit3' || e.key === '3')) {
        e.preventDefault(); // Prevent browser default actions if any
        setIsDisabled(prev => {
          const next = !prev;
          document.documentElement.style.cursor = next ? 'auto' : 'none';
          
          // Reset internal states
          setIsPointer(false);
          setIsBlocked(false);

          const elements = document.querySelectorAll('a, button, [role="button"], input, textarea');
          elements.forEach(el => el.style.cursor = next ? 'auto' : 'none');
          return next;
        });
      }
    };

    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkElement = () => {
      if (isDisabled) return;
      const hoveredElement = document.querySelector(':hover');
      if (!hoveredElement) {
        setIsPointer(false);
        setIsBlocked(false);
        return;
      }

      const computedStyle = window.getComputedStyle(hoveredElement);
      const cursorType = computedStyle.cursor;

      // Ensure we only set pointer state if it's actually over a link/button
      const isActuallyPointer = cursorType === 'pointer' || 
                                hoveredElement.tagName === 'A' || 
                                hoveredElement.tagName === 'BUTTON' ||
                                hoveredElement.closest('button') ||
                                hoveredElement.closest('a');

      setIsPointer(isActuallyPointer);
      setIsBlocked(cursorType === 'not-allowed');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', checkElement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', checkElement);
    };
  }, [isVisible, mouseX, mouseY, isDisabled]);

  if (!isVisible || isDisabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.5 : isBlocked ? 0.8 : 1,
          backgroundColor: isBlocked ? '#ef4444' : isPointer ? '#ffffff' : '#FF6900',
        }}
        className="w-3 h-3 rounded-full fixed top-0 left-0 shadow-[0_0_15px_rgba(255,105,0,0.3)]"
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 4 : isBlocked ? 1.5 : 1,
          opacity: isPointer || isBlocked ? 1 : 0.3,
          borderColor: isBlocked ? '#ef4444' : isPointer ? '#ffffff' : '#FF6900',
        }}
        className="w-8 h-8 rounded-full border border-orange-500 fixed top-0 left-0"
      />

      {/* Blocked Indicator */}
      {isBlocked && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed top-0 left-0 text-white font-bold text-[8px] flex items-center justify-center"
        >
          ✕
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
