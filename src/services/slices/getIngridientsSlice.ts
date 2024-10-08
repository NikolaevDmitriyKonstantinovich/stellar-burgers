import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngridients = createAsyncThunk('getIngridients', async () => {
  const response = await getIngredientsApi();
  console.log('API Response:', response);
  const serializedData = response.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  console.log('Serialized Data:', serializedData);
  return serializedData;
});

interface ingridientsState {
  ingridients: TIngredient[];
  isLoading: boolean;
}

const initialState: ingridientsState = {
  ingridients: [],
  isLoading: false
};

export const getIngridientsSlice = createSlice({
  name: 'getIngridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getIngridients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        console.log('Data being saved:', action.payload);
        state.ingridients = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getIngridients.pending, (state, action) => {
      state.isLoading = true;
      console.log('getIngridients pending');
    });
    builder.addCase(getIngridients.rejected, (state, action) => {
      console.error('Failed to load ingredients:', action.error.message);
      state.ingridients = [];
      state.isLoading = false;
    });
  },
  selectors: {}
});

export const { actions, reducer } = getIngridientsSlice;
export const selectIngredients = (state: { ingredients: ingridientsState }) =>
  state.ingredients.ingridients;
export const isLoadingIngredients = (state: {
  ingredients: ingridientsState;
}) => state.ingredients.isLoading;

export const selectLoadIngredients = (state: {
  ingredients: ingridientsState;
}) => state.ingredients.isLoading;
