import styled from 'styled-components';


export const Wrapper = styled.div`
  border: 1px solid #a5c2d8;
`;

interface IWrapperFilters {
  open: boolean;
}

export const WrapperFilters = styled.div<IWrapperFilters>`
  background-color: #deedf9;
  min-height: ${({ open }) => (open ? '300px' : '0px')};
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const Header = styled.div`
  height: 30px;
  background-color: #eef5fc;
`;

export const HeaderTab = styled.button`
  background-color: #eef5fc;
  color: #878787;
  height: 30px;
  padding: 5px 16px;
  font-size: 12px;
  border: none;
  border-bottom: none;
  border-right: 1px solid #a5c2d8;
  :focus {
    outline: none;
  }
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
  margin-bottom: 15px;
`;

export const SubmitButton = styled.button`
  float: right;
  height: 30px;
  padding: 5px 10px;
`;

export const FilterButton = styled.button`
  font-size: 14px;
  height: 30px;
  padding: 1px 0;
  line-height: 30px;
  font-size: 14px;
  vertical-align: middle;
  color: #ffffff;
  padding: 0 15px;
  border: none;
  background-color: #4db625;
  cursor: pointer;
`;

export const TopPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: flex-end;
  margin-top: 70px;
  border: 1px solid #c4c4c4;
  background-color: #f7fcef;
`;
export const TopPanelTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: calc(100% - 125px);
`;

export const TopPanelButtons = styled.div`
  flex-basis: 120px;
  display: flex;
`;
