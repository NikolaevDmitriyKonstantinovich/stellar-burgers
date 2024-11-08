import store, { rootReducer, RootState } from '../../store';
import { burgerConstructorSlice } from '../constructorSlice';
import { feedSlice } from '../mainPageSlice';
import { orderSlice } from '../orderSlice';
import { authSlice } from '../authSlice';

describe('store tests', () => {
  it('root reducer test', () => {
    const initialState = store.getState();
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty(burgerConstructorSlice.name);
    expect(initialState).toHaveProperty(feedSlice.name);
    expect(initialState).toHaveProperty(orderSlice.name);
    expect(initialState).toHaveProperty(authSlice.name);
  });
});