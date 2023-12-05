import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'root',
  template: `<ui-shell></ui-shell>`,
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigateByUrl('/login');
  }
}
