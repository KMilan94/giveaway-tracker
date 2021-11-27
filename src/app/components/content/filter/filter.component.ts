import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService, PlatformType, GameType } from 'src/app/services/api.service';
import { Giveaway } from '../../../models/giveaway';

type FilterModel = {
  name: string;
  count?: number;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() public giveaways!: Giveaway[];

  public constructor(private apiService: ApiService) {}

  public platformsExpanded = false;
  public selectedPlatform = this.apiService.selectedPlatform;
  public platforms: { [key: string]: FilterModel } = {
    'all': {
      name: 'All'
    },
    'pc': {
      name: 'PC'
    },
    'steam': {
      name: 'Steam'
    },
    'epic-games-store': {
      name: 'Epic Games Store'
    },
    'ubisoft': {
      name: 'Ubisoft'
    },
    'gog': {
      name: 'GOG'
    },
    'itchio': {
      name: 'Itch.io'
    },
    'ps4': {
      name: 'Playstation 4'
    },
    'ps5': {
      name: 'Playstation 5'
    },
    'xbox-one': {
      name: 'Xbox One'
    },
    'xbox-series-xs': {
      name: 'Xbox Series X|S'
    },
    'switch': {
      name: 'Nintendo Switch'
    },
    'android': {
      name: 'Android'
    },
    'ios': {
      name: 'iOS'
    },
    'vr': {
      name: 'VR'
    },
    'battlenet': {
      name: 'Battlenet'
    },
    'origin': {
      name: 'Origin'
    },
    'drm-free': {
      name: 'DRM-Free'
    },
    'xbox-360': {
      name: 'Xbox 360'
    }
  };

  public selectedType = this.apiService.selectedType;
  public types: { [key: string]: FilterModel } = {
    'all': {
      name: 'All'
    },
    'game': {
      name: 'Full Game'
    },
    'loot': {
      name: 'DLC & Loot'
    },
    'beta': {
      name: 'Early Access'
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['giveaways'].currentValue) {
      this.initPlatforms(changes);
      this.initTypes(changes);
    }
  }

  private initTypes(changes: SimpleChanges): void {
    Object.entries(this.types).forEach(
      ([key, value]) => {
        const occurance = changes['giveaways'].currentValue.filter((giveaway: Giveaway) => {
          return giveaway.type.toLowerCase().includes(value.name.toLowerCase())
        }).length || 0;
        this.types[key] = {
          ...this.types[key],
          count: occurance
        };
      }
    );

    this.types['all'] = {
      ...this.types['all'],
      count: changes['giveaways'].currentValue.length || 0
    };
  }

  private initPlatforms(changes: SimpleChanges): void {
    Object.entries(this.platforms).forEach(
      ([key, value]) => {
        const occurance = changes['giveaways'].currentValue.filter((giveaway: Giveaway) => {
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
      count: changes['giveaways'].currentValue.length || 0
    }
  }

  public getCount(dict: { [key: string]: FilterModel }): number {
    return Object.keys(dict).length;
  }

  public togglePlatforms(): void {
    this.platformsExpanded = !this.platformsExpanded;
  }

  public setPlatform(platform: string): void {
    if(platform != this.selectedPlatform) {
      this.selectedPlatform = this.apiService.selectedPlatform = platform as PlatformType;
      this.apiService.fetchGiveaways();
    }
  }

  public setGameType(type: string): void {
    if(type != this.selectedType) {
      this.selectedType = this.apiService.selectedType = type as GameType;
      this.apiService.fetchGiveaways();
    }
  }
}