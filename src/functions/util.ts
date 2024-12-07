export const throttle = <T extends unknown[], R>(func: (...args: T) => R, limit: number) => {
  let inThrottle = false

  return (...args: T): R => {
    if (!inThrottle) {
      const result = func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
      return result
    }
    return func(...args)
  }
}

export const isMac = () => navigator.userAgent.includes("Macintosh") || navigator.platform.includes("Mac")
