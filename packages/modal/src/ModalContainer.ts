import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withTheme } from 'styled-components';

import { xcriticalModalClose } from './actions';
import { getModalByName } from './selectors';

import {
  IStoreWithModal,
  IModalOwnProps,
  IModalStoreProps,
  IModalDispatchProps,
  ModalActions,
} from './interfaces';

import { PureModal } from './Modal';


const mapStateToProps = (
  state: IStoreWithModal,
  { name }: IModalOwnProps,
): IModalStoreProps => {
  const modal = getModalByName(state, name);

  return {
    isOpen: modal.isOpen,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModalActions>,
  { name, onCancel }: IModalOwnProps,
): IModalDispatchProps => ({
  onModalCancel: () => {
    dispatch(xcriticalModalClose(name));

    if (onCancel) {
      onCancel();
    }
  },
});

export const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PureModal));
