import { Component, Input } from '@angular/core';
import { Giveaway } from '../../../models/giveaway';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() public giveaways!: Giveaway[];

}
