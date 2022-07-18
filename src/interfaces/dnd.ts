export interface IDraggable{
    handleDragStart(event: DragEvent): void;
    handleDragEnd(event: DragEvent): void;
}
export interface IDragTarget{
    handleDragOver(event: DragEvent): void;
    handleDrop(event: DragEvent): void;
    handleDragLeave(event: DragEvent): void;
}