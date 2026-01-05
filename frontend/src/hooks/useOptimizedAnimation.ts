import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { isMobileDevice } from '../utils/performance';

export const useOptimizedAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMemo(() => isMobileDevice(), []);

  const getVariants = useMemo(() => {
    // No animations if user prefers reduced motion
    if (shouldReduceMotion) {
      return {
        hidden: {},
        visible: {},
        exit: {}
      };
    }

    // Reduced animations on mobile
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.2 }
        },
        exit: { 
          opacity: 0,
          transition: { duration: 0.15 }
        }
      };
    }

    // Full animations on desktop
    return {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
      },
      exit: { 
        opacity: 0, 
        y: -20,
        transition: { duration: 0.2 }
      }
    };
  }, [shouldReduceMotion, isMobile]);

  const getSpringTransition = useMemo(() => {
    if (shouldReduceMotion || isMobile) {
      return { duration: 0.2 };
    }
    return {
      type: 'spring',
      stiffness: 300,
      damping: 30
    };
  }, [shouldReduceMotion, isMobile]);

  return {
    variants: getVariants,
    transition: getSpringTransition,
    shouldReduceMotion,
    isMobile
  };
};
