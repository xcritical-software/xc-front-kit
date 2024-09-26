import { CombinedState, Reducer, Store } from 'redux';
import { SagaMiddleware } from '@redux-saga/core';
import { Task } from 'redux-saga';

// TODO пофиксить тип.
// сейчас если передать и редюсер и саги но передать только ключ для саг/редюсера,
// без второго и без keyName общего, то ошибки нет. должна быть
export interface IBaseInjectProps {
  children: JSX.Element;
  fallback?: JSX.Element;
  allowSagaUnmount?: boolean;
  reloadSagaIfChanged?: boolean;
}
interface IInjectSagaKey extends IBaseInjectProps {
  sagaKey: string;
  saga: IInjectSaga['saga'];
  keyName?: string;
  reducer?: IInjectReducer['reducer'];
  reducerKey?: string;
}
interface IInjectSagaWithKeyName extends IBaseInjectProps {
  keyName: string;
  saga: IInjectSaga['saga'];
  reducer?: IInjectReducer['reducer'];
  reducerKey?: string;
  sagaKey?: string;
}
interface IInjectReducerKey extends IBaseInjectProps {
  reducerKey: string;
  reducer: IInjectReducer['reducer'];
  keyName?: string;
  saga?: IInjectSaga['saga'];
  sagaKey?: string;
}
interface IInjectReducerWithKeyName extends IBaseInjectProps {
  keyName: string;
  reducer: IInjectReducer['reducer'];
  saga?: IInjectSaga['saga'];
  reducerKey?: string;
  sagaKey?: string;
}

export type IInjectProps =
  | IInjectSagaKey
  | IInjectSagaWithKeyName
  | IInjectReducerKey
  | IInjectReducerWithKeyName;

export type IInjectReducer = {
  key: string;
  reducer?: Reducer;
};

export type IInjectSaga = {
  key: string;
  allowSagaUnmount: boolean;
  saga?: () => Generator;
  reloadSagaIfChanged?: boolean;
};

export interface IInjectedSaga {
  saga: () => Generator;
  task: Task;
}

export interface IInjectorStore extends Store {
  runSaga: SagaMiddleware['run'];
  injectedReducers: Record<string, Reducer>;
  injectedSagas: Record<string, IInjectedSaga | undefined>;
  createReducer: (
    injectedReducers?: Record<string, unknown>
  ) => Reducer<CombinedState<Record<string, unknown>>>;
}
