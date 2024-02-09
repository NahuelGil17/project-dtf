import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output, Renderer2 } from '@angular/core';

/**
 * Directive for handling drag and drop file uploads.
 * @directive
 */
@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  /**
   * A boolean indicating whether a file is being dragged over the element or not.
   */
  @HostBinding('class.fileover') fileOver = false;
  /**
   * An event emitter for when a file is dropped on the element.
   */
  @Output() readonly fileDropped = new EventEmitter<any>();

  /**
   * Creates an instance of the DragNDropUploadFileDirective class.
   * @param {ElementRef} el - The element reference to use for the directive.
   * @param {Renderer2} renderer - The renderer to use for the directive.
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * Dragover listener.
   * @param evt - The dragover event.
   */
  @HostListener('dragover', ['$event']) onDragOver(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.fileOver) {
      this.renderer.addClass(this.el.nativeElement, 'bg-gray-100');
      this.fileOver = true;
    }
  }

  /**
   * Dragleave listener.
   * @param evt - The dragleave event.
   */
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.fileOver) {
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-100');
      this.fileOver = false;
    }
  }

  /**
   * Drop listener.
   * @param evt - The drop event.
   */ @HostListener('drop', ['$event']) public ondrop(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.renderer.removeClass(this.el.nativeElement, 'bg-gray-100');
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
