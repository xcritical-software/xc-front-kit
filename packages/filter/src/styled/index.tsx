import styled from 'styled-components';
import { IFilterTheme } from '../utils';


export const Wrapper = styled.div`
`;

interface IWrapperFilters {
  open: boolean;
  top: number;
  theme: IFilterTheme;
}


export const WrapperFilters = styled.div<IWrapperFilters>`
  ${({ theme }) => theme.filtersPanel}
  min-height: ${({ open }) => (open ? '300px' : '0px')};
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: ${({ top }) => (top ? `${top + 40}px` : 'none')};
`;


export const BodyWrapper = styled.div`
  height: 100%;
  width: 80%;
  min-width: 970px;
  margin: auto;
  margin-top: 30px;
`;


export const FilterField = styled.div`
  width: 30%;
  margin-left: 10px;
  margin-right: 10px;
`;

export const RowWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  /* width: 1200px; */
  margin: 0 auto;
  margin-top: 35px;
`;


export const TopPanel = styled.div`
  ${({ theme }) => theme.topPanel}
  display: flex;
  flex-wrap: wrap;
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
