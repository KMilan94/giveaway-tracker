import { Component, Input, SimpleChanges } from '@angular/core';

import { ApiService, PlatformType, GameType } from 'src/app/services/api.service';
import { Giveaway } from '../../../models/giveaway';
import { platforms } from 'src/app/data/platforms';
import { giveawayTypes } from 'src/app/data/game-types';

export type FilterModel = {
  name: string;
  count?: number;
}

export type Layout = 'component' | 'sidenav';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() public giveaways: Giveaway[];
  @Input() public layout: Layout = 'component';

  public constructor(private apiService: ApiService) { }

  public selectedType = this.apiService.selectedType;
  public selectedPlatform = this.apiService.selectedPlatform;
  public platforms: { [key: string]: FilterModel } = { ...platforms }
  public types: { [key: string]: FilterModel } = { ...giveawayTypes };
  public platformsExpanded = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['giveaways'].currentValue) {
      const giveaways: Giveaway[] = [...changes['giveaways'].currentValue as Giveaway[]];
      this.initPlatforms(giveaways);
      this.initTypes(giveaways);
    }
  }

  private initTypes(giveaways: Giveaway[]): void {
    Object.entries(this.types).forEach(
      ([key, value]) => {
        const occurance = giveaways.filter((giveaway: Giveaway) => {
          return giveaway.type.toLowerCase().includes(value.name.toLowerCase());
        }).length || 0;
        this.types[key] = {
          ...this.types[key],
          count: occurance
        };
      }
    );

    this.types['all'] = {
      ...this.types['all'],
      count: giveaways.length || 0
    };
  }

  private initPlatforms(giveaways: Giveaway[]): void {
    Object.entries(this.platforms).forEach(
      ([key, value]) => {
        const occurance = giveaways.filter((giveaway: Giveaway) => {
          return giveaway.platforms.toLowerCase().includes(value.name.toLowerCase())
        }).length || 0;
        this.platforms[key] = {
          ...this.platforms[key],
          count: occurance
        };
      }
    );

    this.platforms['all'] = {
      ...this.platforms['all'],
      count: giveaways.length || 0
    };
  }

  public getCount(dict: { [key: string]: FilterModel }): number {
    return Object.keys(dict).length;
  }

  public togglePlatforms(): void {
    this.platformsExpanded = !this.platformsExpanded;
  }

  public setPlatform(platform: string): void {
    if (platform != this.selectedPlatform) {
      this.selectedPlatform = this.apiService.selectedPlatform = platform as PlatformType;
      this.apiService.fetchGiveaways();
    }
  }

  public setGameType(type: string): void {
    if (type != this.selectedType) {
      this.selectedType = this.apiService.selectedType = type as GameType;
      this.apiService.fetchGiveaways();
    }
  }
}