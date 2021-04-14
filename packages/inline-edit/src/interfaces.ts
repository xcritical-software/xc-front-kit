import { CSSObject } from 'styled-components';
import { SyntheticEvent, FC } from 'react';

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


export type IEditViewProps<TValue> = {} & {
  value?: TValue;
  onChange: (e: TValue | SyntheticEvent<any>) => void;
  invalid?: boolean;
  error?: string;
};

export interface IReadViewProps<TValue> {
  value?: TValue;
}

export interface ICommonProps {
  appearance?: string;
  baseAppearance?: string;
  label?: string;
  /** Determines whether the read view has 100%
   * width within its container, or whether it fits the content. */
  readViewFitContainerWidth?: boolean;
  disabled?: boolean;
}


export type IInlineEditUncontrolledProps<
  TFieldValue
> = InlineEditCommonProps<TFieldValue> & {
  /** Component to be shown when not in edit view. */
  readView: FC<any>;
  readViewProps?: any;
  /** Component to be shown when editing. */
  editView: FC<any>;
  editViewProps?: any;
  /** Whether the component shows the readView or the editView. */
  isEditing: boolean;

  /** Handler called when readView is clicked. */
  onEditRequested: () => void;
  /**
   * Handler called editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm: (value?: TFieldValue) => void;
  /** Handler called when checkmark is. */
  onCancel?: () => void;
  /** Change default cancel icon */
  cancelIcon?: FC;
  /** Change default successIcon */
  confirmIcon?: FC;
  invalid?: boolean;
  error?: string | string[];
  /** Change 'Read View' to 'Edit View' by double click */
  doubleClickForEditView?: boolean;
};

export type InlineEditCommonProps<
  TFieldValue
> = ICommonProps & {
  /** The value shown in the editView when it is entered. Should be updated by onConfirm. */
  value?: TFieldValue;
  /**
   * Handler is called, editView is closed and changes are confirmed.
   * Field value is passed as an argument to this function.
   */
  onConfirm?: (value?: TFieldValue) => void;
  /** Custom text for error message. */
  error?: string | string[];
};

export type IInlineEditProps<
  TEditViewProps,
  TViewProps,
  TFieldValue
> = InlineEditCommonProps< TFieldValue> & {
  /** Component to be shown when not in edit view. */
  readView: FC<TViewProps & IReadViewProps<TFieldValue>>;
  readViewProps?: Omit<TViewProps, keyof IReadViewProps<TFieldValue>>;
  /** Component to be shown when editing. */
  editView: FC<TEditViewProps & IEditViewProps<TFieldValue>>;
  editViewProps?: Omit<TEditViewProps, 'value' | 'onChange' | 'invalid' | 'error'>;
  /** If this prop is truthy, the editView component is active. */
  isEditing?: boolean;
  /** Callback for changing prop "isEditing" outside the InlineEdit component.
   * Required, if you use "isEditing". */
  onIsEditingChange?: (value: boolean) => void;
  /** Determines whether isEditing begins as true. */
  startWithEditViewOpen?: boolean;
  /** If this prop is truthy, the editView doesn't close and an error message is displayed below it.
   */
  invalid?: boolean;
  /** Change default cancel icon */
  cancelIcon?: FC;
  /** Change default successIcon */
  confirmIcon?: FC;
  onCancel?: (value?: TFieldValue) => void;
  /** Change 'Read View' to 'Edit View' by double click */
  doubleClickForEditView?: boolean;
};


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
