import { maxZIndexManager } from '@xcritical/utils';


const { Provider: ModalProvider, MaxZIndexContext } = maxZIndexManager();

export {
  ModalProvider,
  MaxZIndexContext,
};
