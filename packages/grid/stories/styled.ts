import styled from 'styled-components';


export const Page = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
padding: 0 20px;
`;

export const GridWrapper = styled.div`
  flex: 1 1 0%;
  overflow: hidden;
  margin: 20px 0;
`;
export const SomeBlock = styled.div<{ height: number }>`
  width: 100px;
  height: ${({ height }) => `${height}px`};
  border: 1px solid green;
`;

export const SelectorColumnsWrapper = styled.div`
  display: flex;
`;
