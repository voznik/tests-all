// tslint:disable:directive-class-suffix no-host-metadata-property
import { Directive, Input } from '@angular/core';
export { RouterLink } from '@angular/router';

/** Taken from here:
 * https://github.com/angular/angular/blob/master/aio/content/examples/testing/src/testing/router-link-directive-stub.ts
 */
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink')
  linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
