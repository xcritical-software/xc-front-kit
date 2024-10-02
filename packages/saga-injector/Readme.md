#How use inject to redux

1. Create your store with `createSlice` for your page
```javascript
//store.js

const INIT_STATE = {
  info: {}
}

const infoStore = createSlice({
  name: "INFO",
  initialState: INIT_STATE,
  reducers: {
    setInfo: (state, {payload}) => {
      state.info = payload;
    }
  },
});

export const actions = {
  setInfo: infoStore.action.setInfo
}

export const infoReducer = infoStore.reducer; 
```

2. Create your saga and watchers for this saga
```javascript
//saga.js

import {takeEvery, call, put} from "@redux-saga/core/effects";
import {actions} from "store.js";

function* handlerLoadInfo() {
  const info = yield call(loadInfo);
  yield put(actions.setInfo(info));
}

export function* wathcers() {
  yield takeEvery(actions.setInfo.type, handlerLoadInfo)
}
```


3. Create your component with injecting HOC
```javascript
import React from 'react';
import {ReduxInject} from "./ReduxInject";
import {infoReducer} from 'store.js'
import {wathcers} from 'saga.js'


const YourComponent = () => (
  <div>your component </div>
)

export const YourComponentWithInject = () => (
    <ReduxInject
      keyName='info'
      reducer={infoReducer}
      saga={wathcers}
    >
      <YourComponent />
    </ReduxInject>
)
```

----
After the render your `YourComponentWithInject` saga and reducer injected to the current store.
Inject is successful after 
`Saga with key "keyName" injected`
`Reducer with key "keyName" injected `
in a browser's console

