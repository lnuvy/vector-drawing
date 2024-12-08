import { STORAGE_KEY } from "@/constants"
import { Shape } from "@/types"

/**
 * limit 동안 함수 호출을 제한하는 throttle 함수
 *
 * @param func 함수
 * @param limit 실행 빈도
 *
 * @comment Spline 역할의 자유로운 선 그리기는 mouseMove될때마다 수없이 많은
 * point를 계산하기 때문에 points 배열의 길이를 줄이기 위해 사용
 */
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

/**
 * 현재 OS가 Mac인지 확인하는 함수
 *
 * @comment redo, undo 시 키보드 단축키 cmd/ctrl을 확인할때 사용
 */
export const isMac = () => navigator.userAgent.includes("Macintosh") || navigator.platform.includes("Mac")

/** ------------------------------------------------------------------------------
 * 
 * 로컬스토리지
 * 
 ------------------------------------------------------------------------------ */
export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key)
}

export const setStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const removeStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const getStorageParsed = <T>(key: string): T | null => {
  const value = getStorage(key)
  return value ? JSON.parse(value) : null
}

interface CanvasState {
  shapes: Shape[]
  history: Shape[][]
  historyIndex: number
}
/**
 * 로컬스토리지 세가지 key를 동시에 업데이트하는 함수
 */
export const setStorageCanvasState = ({ shapes, history, historyIndex }: CanvasState): void => {
  setStorage(STORAGE_KEY.SHAPES, JSON.stringify(shapes))
  setStorage(STORAGE_KEY.UNDO_HISTORY, JSON.stringify(history))
  setStorage(STORAGE_KEY.HISTORY_INDEX, String(historyIndex))
}

/**
 * 로컬스토리지 세가지 key를 모두 삭제하는 함수
 */
export const clearStorageCanvasState = (): void => {
  removeStorage(STORAGE_KEY.SHAPES)
  removeStorage(STORAGE_KEY.UNDO_HISTORY)
  removeStorage(STORAGE_KEY.HISTORY_INDEX)
}
