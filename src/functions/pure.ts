export const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let inThrottle = false

  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
