import { CSSObject } from 'styled-components';


import { ITheme, ICSSProperties, AllType } from '@xcritical/theme';


export interface IInlineEditTheme extends ICSSProperties {
  borderRadius?: number;
  contentWrapper?: CSSObject;
  editButton?: CSSObject;
  actionButtonsWrapper?: CSSObject;
  actionButtonWrapper?: CSSObject;
  button?: CSSObject;
}

export type InlineEditTheme = ITheme<IInlineEditTheme>;

export interface IFieldProps<T> {
  value: T;
  onChange: (e: T) => void;
  invalid?: boolean;
  error?: string | string[];
}

export interface ICommonProps {
  theme: InlineEditTheme;
  appearance?: string;
  baseAppearance?: string;
  label?: string;
  /** Determines whether the read view has 100%
   * width within its container, or whether it fits the content. */
  readViewFitContainerWidth?: boolean;
  disabled?: boolean;
}

export interface IInlineEditUncontrolledProps<TFieldValue> extends ICommonProps {
  /** Component to be shown when not in edit view. */
  readView: React.FC<{ value?: TFieldValue }>;
  /** Component to be shown when editing. */
  editView: React.FC<IFieldProps<TFieldValue>>;
  /** Whether the component shows the readView or the editView. */
  isEditing: boolean;
  /** The value shown in the editView when it is entered. Should be updated by onConfirm. */
  defaultValue: TFieldValue;
  /** Handler called when readView is clicked. */
  onEditRequested: () => void;
  /**
   * Handler called editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm: (value: TFieldValue) => void;
  /** Handler called when checkmark is. */
  onCancel?: () => void;
  invalid?: boolean;
  error?: string | string[];
}

export interface IInlineEditProps<TFieldValue> extends ICommonProps {
  /** Component to be shown when not in edit view. */
  readView: React.FC<{ value?: TFieldValue }>;
  /** Component to be shown when editing. */
  editView: React.FC<IFieldProps<TFieldValue>>;
  /**
   * Handler is called, editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm: (value: TFieldValue) => void;
  onCancel?: (defaultValue?: TFieldValue) => void;
  /** If this prop is truthy, the editView component is active. */
  isEditing?: boolean;
  /** Callback for changing prop "isEditing" outside the InlineEdit component.
   * Required, if you use "isEditing". */
  onIsEditingChange?: (value: boolean) => void;
  /** The value is shown in the editView when it is entered. Should be updated by onConfirm. */
  defaultValue: TFieldValue;
  /** Determines whether isEditing begins as true. */
  startWithEditViewOpen?: boolean;
  /** If this prop is truthy, the editView doesn't close and an error message is displayed below it.
   */
  invalid?: boolean;
  /** Custom text for error message. */
  error?: string | string[];
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
