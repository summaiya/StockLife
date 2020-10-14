import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  @Input() maxHeight: number;
  @Input() round: boolean;
  @Input() url: string;
  @Input() des: string;
}
