import { createPortal } from 'react-dom';

import { usePortal } from './utils';
import { IPortalProps } from './interfaces';

const Portal = ({ id, zIndex, children, className }: IPortalProps) => {
  const target = usePortal(id, zIndex, className);

  return createPortal(children, target);
};

export default Portal;
