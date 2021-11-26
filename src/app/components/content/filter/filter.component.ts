import { Component, Input, SimpleChanges } from '@angular/core';
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

  public selectedPlatform = 'pc';
  public platforms: {[key: string]: FilterModel} = {
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

  public selectedType = 'game';
  public types: {[key: string]: FilterModel} = {
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

  public selectedState = 'active';
  public states: {[key: string]: FilterModel} = {
    'active': {
      name: 'Active'
    },
    'inactive': {
      name: 'Inactive'
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['giveaways'].currentValue) {
      console.log(changes['giveaways'].currentValue.length);
      Object.entries(this.platforms).forEach(
        ([key, value]) => {
          const occurance = changes['giveaways'].currentValue.filter((giveaway: Giveaway) => giveaway.platforms.includes(value.name)).length || 0;
          this.platforms[key] = {
            ...this.platforms[key],
            count: occurance
          }
        }
      );

      Object.entries(this.types).forEach(
        ([key, value]) => {
          const occurance = changes['giveaways'].currentValue.filter((giveaway: Giveaway) => giveaway.type.includes(value.name)).length || 0;
          this.types[key] = {
            ...this.types[key],
            count: occurance
          }
        }
      );

      Object.entries(this.states).forEach(
        ([key, value]) => {
          const occurance = changes['giveaways'].currentValue.filter((giveaway: Giveaway) => giveaway.status.includes(value.name)).length || 0;
          this.states[key] = {
            ...this.states[key],
            count: occurance
          }
        }
      );
    }
  }
}