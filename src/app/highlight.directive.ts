import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input()
  appHighlight: string|null = null;

  @Input()
  defaultColor: string|null = null;

  constructor(private el: ElementRef) {
    console.log('init:'+this.appHighlight);
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    console.log('mouseenter:'+this.appHighlight);
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.highlight(null);
  }
  
  private highlight(color: string|null){
    this.el.nativeElement.style.backgroundColor = color;
  }

}
