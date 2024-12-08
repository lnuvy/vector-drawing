/** 과제 요구사항에 있는 도형의 최소 두께 */
export const MIN_STROKE_WEIGHT = 5

/** 과제 요구사항에 있는 도형의 최대 두께 */
export const MAX_STROKE_WEIGHT = 50

/** 과제 요구사항에 있는 undo 최대 저장 갯수 */
export const UNDO_MAX_COUNT = 40

/** 로컬스토리지에 저장되는 konva 관련 키 */
export const STORAGE_KEY = {
  /** Shapes */
  SHAPES: "konva_shapes",
  /** Undo/Redo History */
  UNDO_HISTORY: "konva_undo_history",
  /** Undo/Redo Pointer */
  HISTORY_INDEX: "konva_history_index",
}
