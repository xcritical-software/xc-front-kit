import styled from 'styled-components';
import { IWrapperFilters } from '../../interfaces';


export const WrapperFilters = styled.div<IWrapperFilters>`
  ${({ theme }) => theme.filtersPanel}
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
    flex-basis: calc(10% - 0.5em);
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
  flex-wrap: nowrap;
  width: 100%;
  justify-content: flex-start;
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

export const DropdownItem = styled.div`
  padding: 10px 10px 0 10px;
`;

export const DropdownButtons = styled.div`
  margin-top: 20px;
  padding: 20px 10px 10px 10px;
  border-top: 1px solid #F0F0F0;
  & > * {
    margin-right: 10px;
  }
`;

export const TagLabel = styled.label``;
