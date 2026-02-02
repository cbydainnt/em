export const getAnimationVariant = (type: 'bounce' | 'float' | 'horizontal') => {
  switch (type) {
    case 'bounce':
      return {
        y: [0, -18, -10, -14, 0],
      };
    case 'float':
      return {
        y: [0, -8, -16, -8, 0],
      };
    case 'horizontal':
      return {
        x: [-80, 80, 80, -80, -80],
        rotateY: [0, 0, 180, 180, 0],
      };
    default:
      return { y: [0, -20, 0] };
  }
};

export const getAnimationTransition = (type: 'bounce' | 'float' | 'horizontal') => {
  switch (type) {
    case 'bounce':
      return {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
    case 'float':
      return {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
    case 'horizontal':
      return {
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
    default:
      return {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
  }
};
