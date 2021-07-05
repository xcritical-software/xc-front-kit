import { useRef, useEffect, MutableRefObject } from 'react';

import { Maybe } from '../interfaces';

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
export const createRootElement = (
  id: string,
  zIndex: number | string
): HTMLElement => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  rootContainer.setAttribute('style', `z-index: ${zIndex};`);

  return rootContainer;
};

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
export const addRootElement = (rootElem: HTMLElement) => {
  if (document.body.lastElementChild) {
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling
    );
  }
};

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
export const usePortal = (id: string, zIndex: number | string = 0) => {
  const rootElemRef: MutableRefObject<Maybe<HTMLElement>> = useRef(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent: Maybe<HTMLElement> = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem: HTMLElement =
      existingParent ?? createRootElement(id, zIndex);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    if (rootElemRef.current) {
      parentElem.appendChild(rootElemRef.current);
    }

    return () => {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }

      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, [id, zIndex]);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    return rootElemRef.current;
  };

  return getRootElem();
};
