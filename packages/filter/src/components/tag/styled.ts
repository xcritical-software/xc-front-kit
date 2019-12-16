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

export const RemoveButton = styled.button<any>`
  outline: 0;
  background: transparent;
  cursor: pointer;
  border: 0;
  margin: 0 5px;
  padding: 3px;
  height: 21px;
`;

export const RemoveConditionButton = styled(RemoveButton)`
  position: absolute;
  top: 5px;
  padding: 5px 10px;
  padding-bottom: 0;
  right: 0;
`;
