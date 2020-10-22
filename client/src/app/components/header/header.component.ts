import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="main">
      <h1 class="text-dark">
        <ng-content></ng-content>
      </h1>
      <hr width="70%" />
    </div>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
}
