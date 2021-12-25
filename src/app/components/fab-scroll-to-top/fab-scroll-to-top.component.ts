import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-fab-scroll-to-top',
  templateUrl: './fab-scroll-to-top.component.html',
  styleUrls: ['./fab-scroll-to-top.component.scss']
})
export class FabScrollToTopComponent {

  public windowScrolled: boolean;

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  public scrollToTop(): void {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
