import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
export const AUTH_STORE_KEY = "auth";
export const authStoreAdapter = createEntityAdapter();

export const fetchStore = createAsyncThunk(
  "store/fetchStatus",
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStores()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

interface authStoreState {
  loadingStatus: string;
  error: any;
  userName: string;
  isLogin: boolean;
  deviceToken: string;
}

export const initialStoreState = authStoreAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
  userName: "",
  isLogin: false,
  deviceToken: "",
} as authStoreState);

export const authSlice = createSlice({
  name: AUTH_STORE_KEY,
  initialState: initialStoreState,
  reducers: {
    add: authStoreAdapter.addOne,
    remove: authStoreAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        authStoreAdapter.setAll(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      });
  },
});
export const authReducer = authSlice.reducer;

export const authStoreActions = authSlice.actions;

const { selectAll, selectEntities } = authStoreAdapter.getSelectors();
export const getAuthStoreState = (rootState: any) => rootState[AUTH_STORE_KEY];
export const selectAllStore = createSelector(getAuthStoreState, selectAll);
export const selectStoreEntities = createSelector(
  getAuthStoreState,
  selectEntities
);
