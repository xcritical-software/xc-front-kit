import styled from 'styled-components';


export const Wrapper = styled.div`
`;

interface IWrapperFilters {
  open: boolean;
  top: number;
}


export const WrapperFilters = styled.div<IWrapperFilters>`
  background-color: #deedf9;
  min-height: ${({ open }) => (open ? '300px' : '0px')};
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: ${({ top }) => (top ? `${top + 42}px` : 'none')};
`;


export const BodyWrapper = styled.div`
  height: 100%;
  width: 80%;
  min-width: 970px;
  margin: auto;
  margin-top: 30px;
`;

export const FiltersHeader = styled.div`
  margin-bottom: 5px;
`;

export const FilterColumn = styled.span`
  display: inline-block;
  width: 29%;
  margin: 0 10px;
`;

export const Select = styled.select`
  width: 100%;
`;

export const SelectOption = styled.option``;

export const FilterField = styled.div`
  width: 29%;
  float: left;
  margin: 0 10px;
  height: 1px;
`;
export const Button = styled.button`
  height: 20px;
  border-radius: 10px;
  border: none;
  margin: 0 5px;
  padding: 3px 5px 10px 5px;
  :focus {
    outline: none;
  }
`;

export const RowWrapper = styled.div`
  margin-bottom: 35px;
  height: 25px;
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
  flex-basis: calc(100% - 200px);
  padding-top: 4px;
`;

export const TopPanelButtons = styled.div`
  flex:  0 0 0;
  height: 36px ;
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const WrapperFilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px; 
  margin-left: 50px; 
  margin-bottom: 30px; 
  margin-top: 30px;
`;


export const WrapperTag = styled.div`
  ${({ theme }) => theme.tag}
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
export const WrapperButtons = styled.div`
  margin-left: 10px;
  height: 100%;
`;
