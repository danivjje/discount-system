import type { SortField } from '@packages/types';

export interface SortTableOption {
  title: string;
  label: SortField;
}

export interface NavigationOption {
  title: string;
  route: string;
}
