import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GifThemes } from '../component/helper/Helper';
export const GLOBAL_STORE_KRY = 'global';
export const globalStoreAdapter = createEntityAdapter();

export const fetchStore = createAsyncThunk(
  'store/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStores()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

interface globalStoreState {
  loadingStatus: string;
  error: any;
  userName: string;
  isLogin: boolean;
  deviceToken: string;
  themeIndex: number;
  themeUrl: any;
}

export const initialStoreState = globalStoreAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  userName: '',
  isLogin: false,
  deviceToken: '',
  themeIndex: 1, // Default theme index
  themeUrl: GifThemes.gif1,
} as globalStoreState);

export const globalSlice = createSlice({
  name: GLOBAL_STORE_KRY,
  initialState: initialStoreState,
  reducers: {
    add: globalStoreAdapter.addOne,
    remove: globalStoreAdapter.removeOne,
    setTheme: (state, action: PayloadAction<string>) => {
      state.themeUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        globalStoreAdapter.setAll(state, action.payload);
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});
export const globalReducer = globalSlice.reducer;

export const globalStoreActions = globalSlice.actions;

const { selectAll, selectEntities } = globalStoreAdapter.getSelectors();
export const getGlobalStoreState = (rootState: any) =>
  rootState[GLOBAL_STORE_KRY];
export const selectAllStore = createSelector(getGlobalStoreState, selectAll);
export const selectStoreEntities = createSelector(
  getGlobalStoreState,
  selectEntities
);
