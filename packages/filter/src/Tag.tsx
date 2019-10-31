import React, {
  ReactElement,
  useState,
  useRef,
  MutableRefObject,
  // useEffect,
  // useCallback
} from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  // IFilterRow,
  // IFilterRowProps,
  IMapDispatchFilterRow,
  IPayloadChangeFilter,
  IFilter,
  IFilterTag,
  IFilterTagProps,
} from './interfaces';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
} from './actions';
import { IFilterTheme } from './utils';


interface IWrapperTag {
  theme: IFilterTheme;
}

const getMargin = ({
  theme: {
    tag: {
      margin: {
        top, right, bottom, left,
      },
    },
  },
}: IWrapperTag): string => `${top}px ${right}px ${bottom}px ${left}px`;
const getBorder = ({
  theme: {
    tag: {
      border: {
        radius, color, style, width,
      },
    },
  },
}: IWrapperTag): FlattenSimpleInterpolation => css`
    border: ${width}px ${style} ${color};
    border-radius: ${radius}px;
  `;
const getPadding = ({
  theme: {
    tag: {
      padding: {
        top, right, bottom, left,
      },
    },
  },
}: IWrapperTag): FlattenSimpleInterpolation => css`
  padding: ${top}px ${right}px ${bottom}px ${left}px;
`;

const getFont = ({
  theme: {
    tag: { font },
  },
}: IWrapperTag): FlattenSimpleInterpolation => css`
    font: ${font};
  `;

const WrapperTag = styled.div`
  margin: ${getMargin};
  ${getBorder};
  ${getPadding};
  ${getFont}
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 25px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  :hover {
    background-color: ${({ color }) => color};
  }
  border: none;
  outline: none;
`;

const WrapperElement = styled.div`
  padding-right: 5px;
  padding-left: 5px;
`;

const WrapperFilter = styled.div`
  display: flex;
  align-items: center;
`;
const WrapperButtons = styled.div`
  margin-left: 10px;
  height: 100%;
`;

const Tag = ({
  filter,
  removeFilter,
  id,
  filters,
  changeFilter,
  theme,
}: IFilterTag): ReactElement | null => {
  const [isEdit, changeIsEdit] = useState(false);
  const [value, changeValue] = useState(filter.value);
  const currentFilter: MutableRefObject<IFilter> = useRef(filters.find(
    ({ field }) => field === filter.column,
  ) as IFilter);
  if (!filter.column) return null;

  const { Element, conditions, displayName } = currentFilter.current;
  const handleChange = (v: any): void => {
    changeValue(v);
  };

  return (
    <WrapperTag
      theme={ theme }
      onKeyDown={ (event: any): void => {
        if (isEdit) {
          if (event.key === 'Enter') {
            changeIsEdit(false);
            changeFilter({ field: 'value', value, id });
          }
          if (event.keyCode === 27) {
            changeIsEdit(false);
            changeValue(filter.value);
          }
        }
      } }
    >
      <WrapperFilter
        onClick={ () => {
          if (filter.condition && conditions[filter.condition].hasValue) changeIsEdit(true);
        } }
      >
        { displayName }

        { filter.condition && conditions[filter.condition].displayName }
        { filter.value
          && filter.condition
          && conditions[filter.condition].hasValue && (
          <WrapperElement>
            <Element
              handleChange={ handleChange }
              value={ value }
              key={ filter.column }
              isEdit={ isEdit }
            />
          </WrapperElement>
        ) }
      </WrapperFilter>

      <WrapperButtons>
        { isEdit ? (
          <>
            <DeleteButton
              onClick={ () => {
                changeIsEdit(false);
                changeFilter({ field: 'value', value, id });
              } }
              color="#9FF33D"
            >
              OK
            </DeleteButton>
            <DeleteButton
              onClick={ () => {
                changeValue(filter.value);
              } }
              color="#FF8D40"
            >
              Can
            </DeleteButton>
          </>
        ) : (
          <DeleteButton color="#FF0000" onClick={ () => removeFilter(id) }>
            X
          </DeleteButton>
        ) }
      </WrapperButtons>
    </WrapperTag>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: IFilterTagProps,
): IMapDispatchFilterRow => ({
  changeFilter:
    (changes: IPayloadChangeFilter): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter:
    (id: number): any => dispatch(xcriticalFiltersRemoveFilter(name, id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Tag);
