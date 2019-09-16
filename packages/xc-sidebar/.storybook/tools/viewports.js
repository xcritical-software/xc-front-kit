import reduce from 'lodash/reduce';
import { breakpoints } from './breakpoints';

function viewports() {
  return reduce(
    breakpoints,
    (breakpoint, value, key) => {
      breakpoint[key] = {
        name: value.device,
        styles: {
          width: `${value.width}px`,
          height: `${value.height}px`,
        },
      };
      return breakpoint;
    },
    {},
  );
}

export default viewports();
