// Mobile performance utilities

/**
 * Detect if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Check if device prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimized animation duration based on device
 */
export const getAnimationDuration = (defaultDuration: number): number => {
  if (prefersReducedMotion()) return 0;
  if (isMobileDevice()) return defaultDuration * 0.6; // 40% faster on mobile
  return defaultDuration;
};

/**
 * Detect low-end device based on hardware concurrency
 */
export const isLowEndDevice = (): boolean => {
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  return hardwareConcurrency <= 4;
};

/**
 * Get recommended debounce delay based on device
 */
export const getDebounceDelay = (defaultDelay: number): number => {
  if (isMobileDevice() || isLowEndDevice()) {
    return defaultDelay * 1.5; // Longer delay for mobile/low-end devices
  }
  return defaultDelay;
};

/**
 * Request idle callback with fallback
 */
export const requestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback to setTimeout
  return window.setTimeout(callback, 1) as unknown as number;
};

/**
 * Cancel idle callback with fallback
 */
export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};
