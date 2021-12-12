import { FilterModel } from "../components/content/filter/filter.component";

export const giveawayTypes: { [key: string]: FilterModel } = {
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
};

export const typesData: { [key: string]: FilterModel } = {
    "all": {
        name: 'All',
        count: 101
    },
    "game": {
        name: 'Full Game',
        count: 17
    },
    "loot": {
        name: 'DLC & Loot',
        count: 80
    },
    'beta': {
        name: 'Early Access',
        count: 3
    }
}