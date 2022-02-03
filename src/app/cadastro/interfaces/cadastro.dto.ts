/* eslint-disable @typescript-eslint/naming-convention */
export interface Hero {
  Id: number;
  Name: string;
  CategoryId: number;
  Active: boolean;
}

export interface Category {
  Id: number;
  Name: string;
}
