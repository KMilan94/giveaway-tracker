import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getColorFromGameType } from 'src/app/data/rarity-colors';
import { Giveaway } from 'src/app/models/giveaway';

const DEFAULT_IMAGE_PATH = '../../../../assets/no_image.png';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() giveaway!: Giveaway;

  public constructor(public router: Router) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onImageLoadingFailed($event: any): void {
    $event.target.src = DEFAULT_IMAGE_PATH;
  }

  public getBackgroundColor(giveType: string): Record<string, string> {
    return {
      'background-color': getColorFromGameType(giveType)
    };
  }

  public viewDetails(id: number): void {
    this.router.navigateByUrl(`/details/${id}`);
  }
}
