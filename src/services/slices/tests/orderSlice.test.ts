import { configureStore } from '@reduxjs/toolkit';
import { getOrderbyNumber, getOrders, orderSlice } from '../orderSlice';
import { createOrder } from '../constructorSlice';

type OrderState = ReturnType<typeof orderSlice.reducer>;
describe('orderSlice reducers tests', () => {
  let store: ReturnType<typeof configureStore>;
  beforeEach(() => {
    store = configureStore({ reducer: orderSlice.reducer });
  });

  it('getOrderbyNumber pending', () => {
    const state = store.getState() as OrderState;
    store.dispatch({ type: getOrderbyNumber.pending.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(true);
  });

  it('getOrderbyNumber fulfilled', () => {
    const mockState = {
      orders: ['1'],
      order: null,
      loading: false
    };
    store.dispatch({
      type: getOrderbyNumber.fulfilled.type,
      payload: mockState
    });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.order).toEqual('1');
    expect(updatedState.loading).toBe(false);
  });

  it('getOrderbyNumber rejected', () => {
    store.dispatch({ type: getOrderbyNumber.rejected.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(false);
  });

  //create order
  it('createOrder pending', () => {
    const state = store.getState() as OrderState;
    store.dispatch({ type: createOrder.pending.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(false);
  });

  it('createOrder fulfilled', () => {
    const mockState = {
      orders: ['1'],
      order: null,
      loading: false
    };
    store.dispatch({
      type: createOrder.fulfilled.type,
      payload: mockState
    });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.order).toEqual(null);
    expect(updatedState.loading).toBe(false);
  });

  it('createOrder rejected', () => {
    store.dispatch({ type: createOrder.rejected.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(false);
  });

  //get orders
  it('getOrders pending', () => {
    const state = store.getState() as OrderState;
    store.dispatch({ type: getOrders.pending.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(true);
  });

  it('getOrders fulfilled', () => {
    const mockState = {
      orders: ['1', '2'],
      order: '3',
      loading: false
    };
    store.dispatch({
      type: getOrders.fulfilled.type,
      payload: mockState
    });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.orders).toEqual(mockState);
    expect(updatedState.loading).toBe(false);
  });

  it('getOrders rejected', () => {
    store.dispatch({ type: getOrders.rejected.type });
    const updatedState = store.getState() as OrderState;
    expect(updatedState.loading).toBe(false);
  });
});
