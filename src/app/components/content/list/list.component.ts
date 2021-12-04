import { Component, Input } from '@angular/core';
import { Giveaway } from '../../../models/giveaway';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() public set giveaways(giveaways: Giveaway[]) {
    this._giveaways = Array.isArray(giveaways) ? giveaways : [];
  }

  public get giveaways(): Giveaway[] {
    return this._giveaways;
  }

  private _giveaways: Giveaway[] = [];
}
