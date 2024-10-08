import React from 'react';
import { takeEvery, put } from '@redux-saga/core/effects';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { ReduxInject } from '../src';

const INIT_STATE = {
  user: {},
};

const infoStore = createSlice({
  name: 'INFO',
  initialState: INIT_STATE,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

const actions = {
  setUser: infoStore.actions.setUser,
  getInfo: createAction('getInfo'),
};

const infoReducer = infoStore.reducer;

function* handlerLoadInfo() {
  yield put(actions.setUser({ name: 'John' }));
}

function* watchers() {
  yield takeEvery(actions.getInfo.type, handlerLoadInfo);
}

const YourComponent = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info?.user || {});
  const onClick = () => {
    dispatch(actions.getInfo());
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <button type="button" onClick={onClick}>
        Simulate load info
      </button>
      <div>(Check console for saga logs)</div>
      User name: {info.name}
    </div>
  );
};
export const ComponentWithInject = () => (
  <ReduxInject keyName="info" reducer={infoReducer} saga={watchers}>
    <YourComponent />
  </ReduxInject>
);
