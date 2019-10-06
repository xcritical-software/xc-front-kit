import styled from 'styled-components';


interface IContentContainer {
  maxHeight: number | null;
}

export default styled.div<IContentContainer>`
  [data-role='droplistContent'] {
    ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight}px` : '')};
  }
`;
