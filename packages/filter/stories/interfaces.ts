
export interface IPage {
  onInit: Function;
  isSearchable?: boolean;
}

export interface IDictionary {
  label: string;
  value: any;
  [key: string]: any;
}

export interface IDictionaries {
  [key: string]: IDictionary[];
}
