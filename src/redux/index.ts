import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { thunk } from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import user from './modules/user'
import global from './modules/global'
import auth from './modules/auth'
import tabs from './modules/tabs'

// create reducer
const reducer = combineReducers({ user, global, auth, tabs })

const persistConfig = {
  key: 'redux-state',
  // 存储方式
  storage: storage,
  // 白名单和黑名单配置一种就行
  // 黑名单 --> reducer里不持久化的数据,除此外均为持久化数据,[]表示都持久化
  blacklist: ['auth'],
  // 白名单 --> reducer里持久化的数据,除此外均为不持久化数据
  // whitelist: ['user'],
}

const persistReducerConfig = persistReducer(persistConfig, reducer)

// redux middleWares(self configuration)
const middleWares: Middleware[] = [thunk]

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
  devTools: true,
})

// create persist store
export const persistor = persistStore(store)

// redux hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()
