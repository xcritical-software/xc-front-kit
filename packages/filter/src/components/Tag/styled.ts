import styled from 'styled-components';


export const TagLabel = styled.label`
  padding-bottom: 5px;
  display: inline-block;
`;

export const TagConditionsWrapper = styled.div`
  padding: 20px;
  position: relative;
  border-bottom: 1px solid #F0F0F0;
  & > * {
    margin-right: 10px;
  }
`;

export const DropdownItem = styled.div`
  padding-bottom: 10px;
`;

export const DropdownFooter = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
`;

export const ButtonBlock = styled.div<any>`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: ${({ position }: any) => (position === 'left' ? 'flex-start' : 'flex-end')};
  & > * {
    margin-right: 10px;
  }
`;
