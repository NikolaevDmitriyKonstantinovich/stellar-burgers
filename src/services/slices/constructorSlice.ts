/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { orderBurgerApi } from '../../utils/burger-api';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
type constructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  errorState: null | string | undefined;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  
};
const initialState: constructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  errorState: null,
  orderRequest: false,
  orderModalData: null,
  loading: false,
  
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);



export const burgerConstructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: 
      (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },

      prepare: 
      (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },

    upIngredient: (state, action: PayloadAction<number>) => {
      const indexAction = action.payload;
      if (indexAction > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[indexAction - 1], ingredients[indexAction]] = [
          ingredients[indexAction],
          ingredients[indexAction - 1]
        ];
      }
    },

    downIngredient: (state, action: PayloadAction<number>) => {
      const indexAction = action.payload;
      if (indexAction < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[indexAction + 1], ingredients[indexAction]] = [
          ingredients[indexAction],
          ingredients[indexAction + 1]
        ];
      }
    },

    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },




    clearOrder: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.errorState = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.errorState = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.errorState = action.error.message;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    selectLoading: (state) => state.loading,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    getError: (state) => state.errorState
  }
});


export const {
  getConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectLoading,
  getError
} = burgerConstructorSlice.selectors;


export const {
  addIngredient,
  deleteIngredient,
  upIngredient,
  downIngredient,
  clearOrder
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;


