export interface User {
  username: string;
}

export interface Customer {
  id: number;
  phone: string;
  bonuses: number;
  totalSum: number;
}

export interface AppConfig {
  [key: string]: string | number | boolean;
}

export interface EnrollBonusesForm {
  phone: string;
  sum: number;
}

export interface AuthUserForm {
  username: string;
  password: string;
}
