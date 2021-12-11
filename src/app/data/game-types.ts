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
}