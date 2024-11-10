import { configureStore } from '@reduxjs/toolkit';
import { feedSlice, getFeed } from '../mainPageSlice';

type FeedState = ReturnType<typeof feedSlice.reducer>;
describe('mainPageSlice reducers tests', () => {
  let store: ReturnType<typeof configureStore>;
  beforeEach(() => {
    store = configureStore({ reducer: feedSlice.reducer });
  });

  it('FeedState pending', () => {
    store.dispatch({ type: getFeed.pending.type });
    const updatedState = store.getState() as FeedState;
    expect(updatedState.feedLoading).toBe(true);
  });

  it('FeedState fulfilled', () => {
    const feedState = {
      feedLoading: false,
      orders: [],
      total: 0,
      totalToday: 0
    };
    store.dispatch({
      type: getFeed.fulfilled.type,
      payload: feedState
    });
    const updatedState = store.getState() as FeedState;
    expect(updatedState.orders).toEqual([]);
    expect(updatedState.total).toEqual(0);
    expect(updatedState.totalToday).toEqual(0);
    expect(updatedState.feedLoading).toBe(false);
  });

  it('FeedState rejected', () => {
    store.dispatch({ type: getFeed.rejected.type });
    const updatedState = store.getState() as FeedState;
    expect(updatedState.feedLoading).toBe(false);
  });
});
