import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageNonPoster]',
})
export class ImageNonPosterDirective {
  @Input() placeholder = 'Movie';
  constructor(private el: ElementRef) {}
  @HostListener('error')
  private onError() {
    const img = this.el.nativeElement as HTMLImageElement;
    img.src = `https://images.placeholders.dev/?text=${this.placeholder}&textColor=%236d6e71`;
  }
}
