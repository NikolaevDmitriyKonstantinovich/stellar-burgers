/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'createOrder',
  async (o: string[]) => {
    const res = await orderBurgerApi(o);
    return res;
  }
);

export const getOrders = createAsyncThunk('getOrders', async () => {
  const res = await getOrdersApi();
  return res;
});

export const getOrderbyNumber = createAsyncThunk(
  'getOrderbyNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
    ;
  }
);

interface orderState {
  orders: TOrder[];
  order: TOrder | null;
  loading: boolean;
}

export const initialState: orderState = {
  orders: [],
  order: null,
  loading: false
  // eslint-disable-next-line prettier/prettier
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    deleteOrder: (state) => {
      state.order = null;
      state.orders = [];
      state.loading = false;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderbyNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderbyNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderbyNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectOrder = (state: { order: orderState }) => state.order.order;
export const selectOrderById = (id: number) => (state: { order: orderState }) => {
  return state.order.orders.find(order => order.number === id);
};
export const selectLoading = (state: { order: orderState }) => state.order.loading;
export const selectOrders = (state: { order: orderState }) => state.order.orders;

export const {deleteOrder} = orderSlice.actions;
