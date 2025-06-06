declare module 'vue-cropperjs' {
  import { DefineComponent } from 'vue'
  
  interface CropperOptions {
    viewMode?: number
    dragMode?: 'crop' | 'move' | 'none'
    initialAspectRatio?: number
    aspectRatio?: number
    data?: object
    preview?: string | Element | Array<Element> | NodeList
    responsive?: boolean
    restore?: boolean
    checkCrossOrigin?: boolean
    checkOrientation?: boolean
    modal?: boolean
    guides?: boolean
    center?: boolean
    highlight?: boolean
    background?: boolean
    autoCrop?: boolean
    autoCropArea?: number
    movable?: boolean
    rotatable?: boolean
    scalable?: boolean
    zoomable?: boolean
    zoomOnTouch?: boolean
    zoomOnWheel?: boolean
    wheelZoomRatio?: number
    cropBoxMovable?: boolean
    cropBoxResizable?: boolean
    toggleDragModeOnDblclick?: boolean
    minContainerWidth?: number
    minContainerHeight?: number
    minCanvasWidth?: number
    minCanvasHeight?: number
    minCropBoxWidth?: number
    minCropBoxHeight?: number
  }

  interface CropperMethods {
    crop(): void
    reset(): void
    clear(): void
    replace(url: string, onlyColorChanged?: boolean): void
    enable(): void
    disable(): void
    destroy(): void
    move(offsetX: number, offsetY?: number): void
    moveTo(x: number, y?: number): void
    zoom(ratio: number, pivot?: Event): void
    zoomTo(ratio: number, pivot?: Event): void
    rotate(degree: number): void
    rotateTo(degree: number): void
    scale(scaleX: number, scaleY?: number): void
    scaleX(scaleX: number): void
    scaleY(scaleY: number): void
    getData(rounded?: boolean): object
    setData(data: object): void
    getContainerData(): object
    getImageData(): object
    getCanvasData(): object
    setCanvasData(data: object): void
    getCropBoxData(): object
    setCropBoxData(data: object): void
    getCroppedCanvas(options?: object): HTMLCanvasElement
    setAspectRatio(aspectRatio: number): void
    setDragMode(mode: 'crop' | 'move' | 'none'): void
  }

  type VueCropper = DefineComponent<CropperOptions> & CropperMethods

  const VueCropper: VueCropper
  export default VueCropper
} 