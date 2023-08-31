import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'
import user from './modules/user'
import global from './modules/global'

// create reducer
const reducer = combineReducers({ user, global })

const persistConfig = {
  key: 'redux-state',
  // 存储方式
  storage: storage,
  // 黑名单
  blacklist: ['user'],
  // 白名单
  whitelist: [],
}

const persistReducerConfig = persistReducer(persistConfig, reducer)

// redux middleWares(self configuration)
const middleWares: Middleware[] = [reduxThunk]

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true,
})

// create persist store
export const persistor = persistStore(store)

// redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()
