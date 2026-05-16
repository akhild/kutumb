import { TPersonId, TPersonMap, TRelationId, TRelationMap } from '@/types/model';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import personSlice from "./personslice";
import relationsSlice from "./relationslice";
// import { RootState } from './store';

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
};

// Configure Store
export const store = configureStore({
  reducer: {
    persons: personSlice,
    relations: relationsSlice,
  },
});

export type AppStore = typeof store;
export type Dispatch = AppStore['dispatch']
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => Dispatch = useReduxDispatch;


