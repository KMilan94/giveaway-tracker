import { Component, Input } from '@angular/core';
import { Giveaway } from 'src/app/models/giveaway';

const DEFAULT_IMAGE_PATH = '../../../../assets/no_image.png';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() giveaway!: Giveaway;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onImageLoadingFailed($event: any): void {
    $event.target.src = DEFAULT_IMAGE_PATH;
  }
}
