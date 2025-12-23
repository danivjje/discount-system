import type { Customer, SortField } from '@packages/types';

export interface SortTableOption {
  title: string;
  label: SortField;
}

export interface NavigationOption {
  title: string;
  route: string;
}

type CustomerField = keyof Omit<Customer, 'id'>;

export interface ColumnConfig<F extends CustomerField = CustomerField> {
  header: string;
  field: F;
  isSortable: boolean;
  render: (value: Customer[F]) => string;
}
