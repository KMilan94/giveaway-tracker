import { Component, Input } from '@angular/core';
import { Giveaway } from '../../../models/giveaway';

const DEFAULT_IMAGE_PATH = '../../../../assets/no_image.png';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() public giveaways!: Giveaway[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onImageLoadingFailed($event: any): void {
      $event.target.src = DEFAULT_IMAGE_PATH;
  }
}
