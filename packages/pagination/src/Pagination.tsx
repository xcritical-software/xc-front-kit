/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react';
import { withTheme } from 'styled-components';

import Select from '@xcritical/select';
import Button, { ButtonGroup } from '@xcritical/button';

import { IPagination, IPageSizeOption } from './interfaces';
import { PaginationWrapper } from './styles';
import { Totals } from './Totals';
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
  showTotals = false,
  disabled = false,
  pageSize = 25,
  pageSizeOptions = [25, 50, 100],
  pageSizeProps,
  total,
  onChangePage,
  onChangePageSize,
  theme,
  className,
  classNamePrefix,
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
    totalPages: number
  ): void => {
    const newCurrentPage = visibleCenterPage + visibleRange;
    const isEndRange = newCurrentPage > totalPages - visibleRange;

    const newAvailableCurrentPage = isEndRange
      ? totalPages - availableVisibleRangeCenter
      : newCurrentPage;

    onChangePage(newAvailableCurrentPage);
  };

  const changePageSize = (pageSizeOption: IPageSizeOption | null): void => {
    const newTotalPages = Math.ceil(total / (pageSizeOption?.value ?? 1));
    const newCurrentPage =
      currentPage > newTotalPages ? newTotalPages : currentPage;

    if (onChangePageSize) {
      onChangePageSize(newCurrentPage, pageSizeOption?.value ?? 1);
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const totalVisiblePages = totalPages - 2;

  const needFirstPage = totalPages >= 1;
  const needVisiblePages = totalPages >= 3;
  const needLastPage = totalPages >= 2;

  const isAvailableVisibleRange = totalVisiblePages > visibleRange;
  const availableVisibleRange = isAvailableVisibleRange
    ? visibleRange
    : totalVisiblePages;
  const availableVisibleRangeCenter = Math.ceil(availableVisibleRange / 2);

  const visiblePagesArray = getVisiblePagesArray(
    currentPage,
    totalPages,
    isAvailableVisibleRange,
    availableVisibleRange,
    availableVisibleRangeCenter
  );
  // eslint-disable-next-line prefer-destructuring
  const visibleCenterPage = visiblePagesArray[availableVisibleRangeCenter - 1];

  const showPrevious =
    isAvailableVisibleRange &&
    visibleCenterPage - availableVisibleRangeCenter > 1;

  const showNext =
    isAvailableVisibleRange &&
    visibleCenterPage + availableVisibleRangeCenter < totalPages;

  const mappedPageSizeOption = mapPageSizeOption(pageSize);
  const mappedPageSizeOptions = pageSizeOptions.map(mapPageSizeOption);

  const paginationButtonGroupTheme = getPaginationButtonGroupTheme(theme);
  const paginationButtonTheme = getPaginationButtonTheme(theme);
  const paginationSelectTheme = getPaginationSelectTheme(theme);

  return (
    <PaginationWrapper className={className}>
      {showTotals && (
        <Totals
          className={classNamePrefix && `${classNamePrefix}__totals`}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
        />
      )}

      <ButtonGroup
        className={classNamePrefix && `${classNamePrefix}__button-group`}
        theme={paginationButtonGroupTheme}>
        {needFirstPage && (
          <Button
            className={
              classNamePrefix && `${classNamePrefix}__button-${currentPage}`
            }
            classNamePrefix={classNamePrefix && `${classNamePrefix}-button`}
            theme={paginationButtonTheme}
            appearance="paginationButton"
            selected={currentPage === 1}
            disabled={disabled}
            onClick={() => onChangePage(1)}>
            1
          </Button>
        )}

        {showPrevious && (
          <Button
            className={classNamePrefix && `${classNamePrefix}__button-previous`}
            classNamePrefix={classNamePrefix && `${classNamePrefix}-button`}
            theme={paginationButtonTheme}
            appearance="paginationButton"
            disabled={disabled}
            onClick={() => toPrevious(availableVisibleRangeCenter)}>
            <span>&lsaquo;</span>
          </Button>
        )}

        {needVisiblePages &&
          visiblePagesArray.map((visiblePage: number) => (
            <Button
              className={
                classNamePrefix &&
                `${classNamePrefix}__button-visible-page-${visiblePage}`
              }
              classNamePrefix={classNamePrefix && `${classNamePrefix}-button`}
              key={visiblePage}
              theme={paginationButtonTheme}
              appearance="paginationButton"
              selected={currentPage === visiblePage}
              disabled={disabled}
              onClick={() => onChangePage(visiblePage)}>
              {visiblePage}
            </Button>
          ))}

        {showNext && (
          <Button
            className={className && `${className}__button-next`}
            classNamePrefix={classNamePrefix && `${classNamePrefix}-button`}
            theme={paginationButtonTheme}
            appearance="paginationButton"
            disabled={disabled}
            onClick={() =>
              toNext(availableVisibleRangeCenter, visibleCenterPage, totalPages)
            }>
            <span>&rsaquo;</span>
          </Button>
        )}

        {needLastPage && (
          <Button
            className={
              classNamePrefix && `${classNamePrefix}__button-last-page`
            }
            classNamePrefix={classNamePrefix && `${classNamePrefix}-button`}
            theme={paginationButtonTheme}
            appearance="paginationButton"
            selected={currentPage === totalPages}
            disabled={disabled}
            onClick={() => onChangePage(totalPages)}>
            {totalPages}
          </Button>
        )}
      </ButtonGroup>

      {showSizeChanger && (
        <Select
          className={classNamePrefix && `${classNamePrefix}__select`}
          classNamePrefix={classNamePrefix && `${classNamePrefix}-select`}
          theme={paginationSelectTheme}
          appearance="paginationSelect"
          options={mappedPageSizeOptions}
          value={mappedPageSizeOption}
          isDisabled={disabled}
          isMulti={false}
          onChange={changePageSize}
          {...pageSizeProps}
        />
      )}
    </PaginationWrapper>
  );
};

export const Pagination = withTheme(PurePagination);
