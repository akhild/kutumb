import { TPersonCompiled, TPersonId, TPersonMap, TRelationId, TRelationMap } from '@/types/model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import newPersonSlice from "./newpersonslice";
import personSlice, { addPersonMiddleware } from "./personslice";
import relationsSlice from "./relationslice";

// Root State Type
export type RootState = {
  persons: {
    byId: TPersonMap;
    allIds: TPersonId[];
  };
  relations: {
    byId: TRelationMap;
    allIds: TRelationId[];
  };
  newperson: TPersonCompiled & { error: string | undefined };
};

const rootReducer = combineReducers({
  persons: personSlice,
  relations: relationsSlice,
  newperson: newPersonSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['newperson']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(addPersonMiddleware),
});

export type AppStore = typeof store;
export type Dispatch = AppStore['dispatch']
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => Dispatch = useReduxDispatch;
export const AppPersistor = persistStore(store);