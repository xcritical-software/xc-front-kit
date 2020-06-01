import styled from 'styled-components';

import { IBlanketProps } from '../../interfaces';


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

export const DropdownRoot = styled.div`
  position: relative;
  padding-right: 10px; 
  padding-bottom: 10px;
`;

export const Blanket = styled.div<IBlanketProps>`
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: ${({ zIndex }) => zIndex};
`;

export const ValidationError = styled.div`
  ${({ theme }) => theme.validationError}
`;
