export interface IPage {
  onInit: Function;
  isSearchable?: boolean;
  isTagsVisible?: boolean;
  disabled?: boolean;
}
export interface IPageExternal extends IPage {
  onChangeExternal: Function;
  userName: string;
}

export interface IDictionary {
  [key: string]: any;
  label: string;
  value: any;
}

export interface IDictionaries {
  [key: string]: IDictionary[];
}
