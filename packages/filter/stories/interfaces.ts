
export interface IPage {
  onInit: Function;
  isSearchable?: boolean;
  disabled?: boolean;
}
export interface IPageExternal extends IPage {
  onChangeExternal: Function;
  userName: string;
}

export interface IDictionary {
  label: string;
  value: any;
  [key: string]: any;
}

export interface IDictionaries {
  [key: string]: IDictionary[];
}
