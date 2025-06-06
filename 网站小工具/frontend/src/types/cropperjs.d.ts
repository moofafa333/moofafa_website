declare module 'cropperjs' {
  export interface CropperOptions {
    viewMode?: number
    dragMode?: 'crop' | 'move' | 'none'
    aspectRatio?: number
    autoCropArea?: number
    restore?: boolean
    modal?: boolean
    guides?: boolean
    highlight?: boolean
    cropBoxMovable?: boolean
    cropBoxResizable?: boolean
    toggleDragModeOnDblclick?: boolean
    ready?: () => void
    crop?: (event: { detail: CropperData }) => void
  }

  export interface CropperData {
    x: number
    y: number
    width: number
    height: number
    rotate: number
    scaleX: number
    scaleY: number
  }

  export interface ContainerData {
    width: number
    height: number
  }

  export interface CropBoxData {
    left: number
    top: number
    width: number
    height: number
  }

  export interface CroppedCanvasOptions {
    width?: number
    height?: number
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    fillColor?: string
    imageSmoothingEnabled?: boolean
    imageSmoothingQuality?: 'low' | 'medium' | 'high'
  }

  export default class Cropper {
    constructor(element: HTMLElement, options?: CropperOptions)
    destroy(): void
    reset(): void
    clear(): void
    replace(url: string, onlyColorChanged?: boolean): void
    enable(): void
    disable(): void
    crop(): void
    move(offsetX: number, offsetY?: number): void
    moveTo(x: number, y?: number): void
    zoom(ratio: number): void
    zoomTo(ratio: number, pivot?: { x: number; y: number }): void
    rotate(degree: number): void
    rotateTo(degree: number): void
    scale(scaleX: number, scaleY?: number): void
    getData(rounded?: boolean): CropperData
    setData(data: Partial<CropperData>): void
    getContainerData(): ContainerData
    getImageData(): any
    getCanvasData(): any
    setCanvasData(data: any): void
    getCropBoxData(): CropBoxData
    setCropBoxData(data: Partial<CropBoxData>): void
    setAspectRatio(aspectRatio: number): void
    setDragMode(mode: 'crop' | 'move' | 'none'): void
    getCroppedCanvas(options?: CroppedCanvasOptions): HTMLCanvasElement
  }
} 