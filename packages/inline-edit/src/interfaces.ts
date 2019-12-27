import { ReactNode, RefObject } from 'react';


import { ITheme, ICSSProperties, AllType } from '@xcritical/theme';


export interface IInlineEditTheme extends ICSSProperties {
  borderRadius?: number;
}

export type InlineEditTheme = ITheme<IInlineEditTheme>;

export interface IFieldProps<T> {
  value: T;
  onChange: (e) => void;
}

export interface ICommonProps {
  theme: InlineEditTheme;
  appearance?: string;
  baseAppearance?: string;
  label?: string;
  /** Set whether onConfirm should be called on blur. */
  keepEditViewOpenOnBlur?: boolean;
  /** Sets whether the checkmark and cross are displayed in the bottom right of the field. */
  hideActionButtons?: boolean;
  /** Determines whether the input value can be confirmed as empty. */
  isRequired?: boolean;
  /** Determines whether the read view has 100%
   * width within its container, or whether it fits the content. */
  readViewFitContainerWidth?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus?: () => void;
}

export interface IInlineEditUncontrolledProps<TFieldValue> extends ICommonProps {
  /** Component to be shown when not in edit view. */
  readView: () => ReactNode;
  /** Component to be shown when editing. */
  editView: (fieldProps: IFieldProps<TFieldValue>) => ReactNode;
  /** Whether the component shows the readView or the editView. */
  isEditing: boolean;
  /** The value shown in the editView when it is entered. Should be updated by onConfirm. */
  defaultValue: AllType;
  /** Handler called when readView is clicked. */
  onEditRequested: () => void;
  /**
   * Handler called editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm: (value: AllType) => void;
  /** Handler called when checkmark is. */
  onCancel: () => void;
}

export interface IInlineEditProps<TFieldValue> extends ICommonProps {
  /** Component to be shown when not in edit view. */
  readView: () => ReactNode;
  /** Component to be shown when editing. */
  editView: (
    fieldProps: IFieldProps<TFieldValue>,
    ref: RefObject<AllType>,
  ) => ReactNode;
  /**
   * Handler called editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm: (value: AllType) => void;
  onCancel: (defaultValue?: AllType) => void;
  /** The value shown in the editView when it is entered. Should be updated by onConfirm. */
  defaultValue: AllType;
  /** Determines whether isEditing begins as true. */
  startWithEditViewOpen?: boolean;
}

export interface IReturnFunction<TValue> {
  (
    theme: InlineEditTheme,
    elementName: string,
    appearance?: string,
    baseAppearance?: string,
  ): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetPropStyles<TResult> =
  IReturnFunction<IReturnWithArgsFunction<AllType, TResult>>;
