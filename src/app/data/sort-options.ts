import { SortModel } from "../components/content/sort/sort.component";

export const sortOptions: { [key: string]: SortModel } = {
  'date': {
    name: 'Relevance',
    icon: 'date_range'
  },
  'value': {
    name: 'Value',
    icon: 'attach_money'
  },
  'popularity': {
    name: 'Popularity',
    icon: 'timeline'
  }
}