import { configureStore } from '@reduxjs/toolkit';
import { getIngridients, getIngridientsSlice } from '../getIngridientsSlice';

type IngredientsState = ReturnType<typeof getIngridientsSlice.reducer>;
describe('getIngredientsSlice reducers tests', () => {
  let store: ReturnType<typeof configureStore>;
  beforeEach(() => {
    store = configureStore({ reducer: getIngridientsSlice.reducer });
  });
  it('getIngridients pending', () => {
    store.dispatch({ type: getIngridients.pending.type });
    const updatedState = store.getState() as IngredientsState;
    expect(updatedState.isLoading).toBe(true);
  });
  it('getIngredients fulfilled', () => {
    const mockIngridients = [
      {
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ];
    store.dispatch({
      type: getIngridients.fulfilled.type,
      payload: mockIngridients
    });
    const updatedState = store.getState() as IngredientsState;
    expect(updatedState.ingridients).toEqual(mockIngridients);
    expect(updatedState.isLoading).toBe(false);
  });
  it('getIngridients rejected', () => {
    store.dispatch({ type: getIngridients.rejected.type });
    const updatedState = store.getState() as IngredientsState;
    expect(updatedState.isLoading).toBe(false);
  });
});
