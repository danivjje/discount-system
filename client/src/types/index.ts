export interface EnrollBonusesForm {
  phone: string;
  sum: number;
}

export interface Admin {
  id: number;
  username: string;
  password: string;
}

export interface Customer {
  id: number;
  phone: string;
  bonuses: number;
  totalSum: number;
}

export interface AppConfig {
  [key: string]: string;
}
