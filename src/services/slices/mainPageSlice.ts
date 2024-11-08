import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getIngridients } from './getIngridientsSlice';

// export const getFeed = createAsyncThunk('getFeed', async () => {
//   try {
//   const result = await getFeedsApi();
//   console.log('getFeedsApi result:', result);
//   return result;
//   } catch (error) {
//     console.log('getFeedsApi error:', error);
//   }
// });

export const getFeed = createAsyncThunk('getFeed', getFeedsApi);

interface IFeed {
  feedLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const feedInitialState: IFeed = {
  feedLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state, action) => {
      state.feedLoading = true;
      console.log('getFeed.pending');
    });
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totalToday = action.payload.totalToday;
      state.total = action.payload.total;
      state.feedLoading = false;
    });
    builder.addCase(getFeed.rejected, (state, action) => {
      state.feedLoading = false;
      console.log('getFeed.rejected');
    });
  }
});

export const selectFeed = (state: { feed: IFeed }) => state.feed;
export const selectOrders = (state: { feed: IFeed }) => state.feed.orders;
export const selectTotalToday = (state: { feed: IFeed }) =>
  state.feed.totalToday;
export const selectTotal = (state: { feed: IFeed }) => state.feed.total;
export const selectLoading = (state: { feed: IFeed }) => state.feed.feedLoading;
