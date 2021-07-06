import styled from 'styled-components';

export const TagLabel = styled.label`
  padding-bottom: 5px;
  display: inline-block;
`;

export const TagConditions = styled.div`
  ${({ theme }) => theme.tagConditions}
`;

export const TagConditionsWrapper = styled.div`
  padding: 20px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
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
  justify-content: ${({ position }: any) =>
    position === 'left' ? 'flex-start' : 'flex-end'};
  & > * {
    margin-right: 10px;
  }
`;

export const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding: 0 3px;
  height: 20px;
`;

export const RemoveConditionButton = styled(RemoveButton)`
  position: absolute;
  top: 5px;
  padding: 5px 10px;
  padding-bottom: 0;
  right: 0;
`;
