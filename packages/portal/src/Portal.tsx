import { createPortal } from 'react-dom';

import { usePortal } from './utils';
import { IPortalProps } from './interfaces';

const Portal = ({ id, zIndex, children }: IPortalProps) => {
  const target = usePortal(id, zIndex);

  return createPortal(children, target);
};

export default Portal;
