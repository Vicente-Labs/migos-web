export const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  slideIn: {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.3 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.3 },
  },
} as const
