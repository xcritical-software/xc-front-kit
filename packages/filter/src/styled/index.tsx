import styled from 'styled-components';
import { IWrapperFilters } from '../interfaces';


export const WrapperFilters = styled.div<IWrapperFilters>`
  ${({ theme }) => theme.filtersPanel}
  min-height: ${({ open }) => (open ? '300px' : '0px')};
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: ${({ top }) => (top ? `${top + 40}px` : 'none')};
`;

export const FilterField = styled.div`
  flex: 0 0 calc(30% - 0.5em);
  padding-left: 0.5em;
  padding-right: 0.5em;
  :last-child {
    flex-grow: calc(10% - 0.5em);
    padding-right:0;
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  width: 80%;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
`;

export const TopPanel = styled.div`
  ${({ theme }) => theme.topPanel}
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-end;
`;

export const RootPanel = styled.div`
  ${({ theme }) => theme.topPanel}
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  justify-content: flex-end;
`;

export const TopPanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: calc(100% - 230px);
  padding-top: 4px;
`;

export const TopPanelButtons = styled.div`
  flex:  0 0 220px;
  height: 36px ;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 4px;
`;
export const WrapperButtons = styled.div`
  margin-left: 10px;
  height: 36px;
  display: flex;
  justify-content: space-between;
`;

export const WrapperFilterButtons = styled.div`
  ${({ theme }) => theme.filterPanelButtons}
  display: flex;
  justify-content: space-between;
  width: 300px;
`;


export const WrapperTag = styled.div`
  ${({ theme }) => theme.tag};
  height: 36px ;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const WrapperElement = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

export const WrapperFilter = styled.div`
  display: flex;
  align-items: center;
`;
