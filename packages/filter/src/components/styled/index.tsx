import styled from 'styled-components';


export const RootPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  justify-content: flex-end;

  ${({ theme }) => theme.rootPanel}
`;

export const TopPanel = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: flex-start;

  ${({ theme }) => theme.topPanel}
`;

export const Prefix = styled.div`
  ${({ theme }) => theme.prefix}
`;

export const SearchInputWrapper = styled.div`
  height: 37px;
  margin: 4px 0;
  padding-right: 10px;

  ${({ theme }) => theme.searchInputWrapper}
`;

export const TopPanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 4px;

  ${({ theme }) => theme.topPanelTags}
`;

export const TopPanelButtons = styled.div`
  flex:  0 0 220px;
  height: 36px ;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;

  & > * {
    margin-right: 10px;
  }

  ${({ theme }) => theme.topPanelButtons}
`;

export const Postfix = styled.div`
  ${({ theme }) => theme.postfix}
`;

export const Blanket = styled.div`
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 1;
`;

export const DropdownContent = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 0 1px hsla(218, 50%, 10%, 0.1), 0 4px 11px hsla(218, 50%, 10%, 0.1);
  margin-top: 8px;
  position: absolute;
  z-index: 2;
`;

export const ValidationError = styled.div`
  ${({ theme }) => theme.validationError}
`;
