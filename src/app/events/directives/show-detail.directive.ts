import { Directive, ElementRef, OnInit, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowDetail]'
})
export class ShowDetailDirective implements OnInit {

  private isVisible: boolean = false;
  private detailElement;

  constructor(private _element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') showOrHide(): void {
    this._toggleVisibility();
  }

  ngOnInit(): void {
    console.log('Directive apply !');
  }

  ngAfterViewInit() {
    console.log('After view init');
    this.detailElement = this._element.nativeElement.querySelector('div[class="detail"]', 'div[class="detail hidden"]');
  }
  private _toggleVisibility(): void {
    console.log('Change visible status of : ' + JSON.stringify(this.detailElement));
    this.isVisible = !this.isVisible;

    if (this.isVisible) {
      this.renderer.removeClass(this.detailElement, 'hidden');
    } else {
      this.renderer.addClass(this.detailElement, 'hidden');
    }

  }
}
