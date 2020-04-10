import React from 'react';
import { withTheme } from 'styled-components';
import Select from '@xcritical/select';

import Button, { ButtonGroup } from '@xcritical/button';

import { IPagination, IPageSizeOption } from './interfaces';
import { PaginationWrapper, TotalInfo } from './styles';

import {
  getVisiblePagesArray,
  getPaginationButtonGroupTheme,
  getPaginationButtonTheme,
  getPaginationSelectTheme,
  mapPageSizeOption,
} from './utils';


const PurePagination: React.FC<IPagination> = ({
  currentPage = 1,
  visibleRange = 5,
  showSizeChanger = true,
  isDisabled = false,
  showTotalInfo = false,
  pageSize = 25,
  pageSizeOptions = [25, 50, 100],
  total,
  selectProps,
  onChangePage,
  onChangePageSize,
  theme,
}) => {
  const toPrevious = (availableVisibleRangeCenter: number): void => {
    const newCurrentPage = currentPage - visibleRange;
    const isStartRange = newCurrentPage <= visibleRange;

    const newAvailableCurrentPage = isStartRange
      ? availableVisibleRangeCenter + 1
      : newCurrentPage;

    onChangePage(newAvailableCurrentPage);
  };

  const toNext = (
    availableVisibleRangeCenter: number,
    visibleCenterPage: number,
    totalPages: number,
  ): void => {
    const newCurrentPage = visibleCenterPage + visibleRange;
    const isEndRange = newCurrentPage > totalPages - visibleRange;

    const newAvailableCurrentPage = isEndRange
      ? totalPages - availableVisibleRangeCenter
      : newCurrentPage;

    onChangePage(newAvailableCurrentPage);
  };

  const changePageSize = (pageSizeOption: IPageSizeOption): void => {
    const newTotalPages = Math.ceil(total / pageSizeOption.value);
    const newCurrentPage = currentPage > newTotalPages ? newTotalPages : currentPage;

    if (onChangePageSize) {
      onChangePageSize(newCurrentPage, pageSizeOption.value);
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const totalVisiblePages = totalPages - 2;

  const needFirstPage = totalPages >= 1;
  const needVisiblePages = totalPages >= 3;
  const needLastPage = totalPages >= 2;

  const isAvailableVisibleRange = totalVisiblePages > visibleRange;
  const availableVisibleRange = isAvailableVisibleRange ? visibleRange : totalVisiblePages;
  const availableVisibleRangeCenter = Math.ceil(availableVisibleRange / 2);

  const visiblePagesArray = getVisiblePagesArray(
    currentPage,
    totalPages,
    isAvailableVisibleRange,
    availableVisibleRange,
    availableVisibleRangeCenter,
  );
  const visibleCenterPage = visiblePagesArray[availableVisibleRangeCenter - 1];

  const showPrevious = isAvailableVisibleRange
    && visibleCenterPage - availableVisibleRangeCenter > 1;

  const showNext = isAvailableVisibleRange
    && visibleCenterPage + availableVisibleRangeCenter < totalPages;

  const mappedPageSizeOption = mapPageSizeOption(pageSize);
  const mappedPageSizeOptions = pageSizeOptions.map(mapPageSizeOption);

  const paginationButtonGroupTheme = getPaginationButtonGroupTheme(theme);
  const paginationButtonTheme = getPaginationButtonTheme(theme);
  const paginationSelectTheme = getPaginationSelectTheme(theme);

  return (
    <PaginationWrapper>
      { showTotalInfo && (
        <TotalInfo>
          { `${currentPage} - ${pageSize > total ? total : pageSize} of ${total}` }
        </TotalInfo>
      ) }

      <ButtonGroup theme={ paginationButtonGroupTheme }>
        { needFirstPage && (
          <Button
            theme={ paginationButtonTheme }
            appearance="paginationButton"
            selected={ currentPage === 1 }
            disabled={ isDisabled }
            onClick={ () => onChangePage(1) }
          >
            1
          </Button>
        ) }

        { showPrevious && (
          <Button
            theme={ paginationButtonTheme }
            appearance="paginationButton"
            disabled={ isDisabled }
            onClick={ () => toPrevious(availableVisibleRangeCenter) }
          >
            <span>&lsaquo;</span>
          </Button>
        ) }

        { needVisiblePages && visiblePagesArray.map((visiblePage: number) => (
          <Button
            key={ visiblePage }
            theme={ paginationButtonTheme }
            appearance="paginationButton"
            selected={ currentPage === visiblePage }
            disabled={ isDisabled }
            onClick={ () => onChangePage(visiblePage) }
          >
            { visiblePage }
          </Button>
        )) }

        { showNext && (
          <Button
            theme={ paginationButtonTheme }
            appearance="paginationButton"
            disabled={ isDisabled }
            onClick={ () => toNext(availableVisibleRangeCenter, visibleCenterPage, totalPages) }
          >
            <span>&rsaquo;</span>
          </Button>
        ) }

        { needLastPage && (
          <Button
            theme={ paginationButtonTheme }
            appearance="paginationButton"
            selected={ currentPage === totalPages }
            disabled={ isDisabled }
            onClick={ () => onChangePage(totalPages) }
          >
            { totalPages }
          </Button>
        ) }
      </ButtonGroup>

      { showSizeChanger && (
        <Select
          theme={ paginationSelectTheme }
          appearance="paginationSelect"
          options={ mappedPageSizeOptions }
          value={ mappedPageSizeOption }
          isDisabled={ isDisabled }
          onChange={ changePageSize }
          { ...selectProps }
        />
      ) }
    </PaginationWrapper>
  );
};

export const Pagination = withTheme(PurePagination);
