export interface IPage {
  filters: IMappedFilter[];
  dictionaries: IDictionary[];
}

export interface IMappedFilter {
  field: string;
  name: string;
  type: string;
  displayName: string;
}

export interface IFilter {
  field: string;
  displayName: string;
  conditions: IConditions;
  Element: Function;
}

export interface ICondition {
  displayName: string;
  hasValue: boolean;
}

export interface IConditions {
  [key: string]: ICondition;
}

export interface IConditionsAll {
  [key: string]: IConditions;
}


interface IColumn {
  name: string ;
  displayName: string ;
  field: string ;
  type: string ;
}

export interface IDictionary {
  id: number;
  name: string;
  order: number;
}

export interface IDictionaries {
  [key: string]: IDictionary[];
}

export interface IAction {
  type: string;
  payload: IActionPayload;
}

interface IExtras {
  [key: string]: any;
}

export interface IActionPayload {
  id: number;
  title: string ;
  infiniteScrollPageSize: number ;
  filters: never[] ;
  columns: IColumn[];
  dictionaries: IDictionaries;
  extras: IExtras;
}
export interface IState {
  id: number;
  title: string ;
  infiniteScrollPageSize: number ;
  filters: never[] ;
  columns: IColumn[];
  dictionaries: IDictionary[];
  extras: IExtras;
}

export interface ICreateElement {
  name: string;
  type: string;
  dictionaries: IDictionary[];
}


export interface IElementProps {
  handleChange: FunctionStringCallback;
  value: string;
  isEdit: boolean;
}
export interface IDictionaryElementProps extends IElementProps {
  name: string;
  dictionaries: IDictionary[];
}
