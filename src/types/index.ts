import Konva from "konva"

/** ------------------------------------------------------------------------------
 * 
 * type과 enum을 관리하는 파일입니다.
 * 
 ------------------------------------------------------------------------------ */

/** 헤더 선택 도구 */
export enum Tool {
  Cursor = "cursor",
  SimpleLine = "simple-line",
  Spline = "spline",
  Rect = "rect",
  Circle = "circle",
  Polygon = "polygon",
}

export type AddDragging<T> = T & { id: string; isDragging: boolean }

export type Shape =
  | (AddDragging<Konva.LineConfig> & { type: Tool.SimpleLine | Tool.Spline })
  | (AddDragging<Konva.EllipseConfig> & { type: Tool.Circle })
  | (AddDragging<Konva.RectConfig> & { type: Tool.Rect })
  | (AddDragging<Konva.RegularPolygonConfig> & { type: Tool.Polygon })

export interface Point {
  x: number
  y: number
}
