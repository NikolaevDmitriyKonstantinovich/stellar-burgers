import { configureStore } from '@reduxjs/toolkit';
import { authSlice, checkUserAuth, loginUser, logoutUser, updateUserAuth, userRegistration } from '../authSlice';


type AuthState = ReturnType<typeof authSlice.reducer>;

describe('authSlice reducers tests', () => {
  let store: ReturnType<typeof configureStore>;
  beforeEach(() => {
    store = configureStore({ reducer: authSlice.reducer });
  });

  it('user reg pending', () => {
    const state = store.getState() as AuthState;
    store.dispatch({ type: userRegistration.pending.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(true);
  });
  it('user reg fulfilled', () => {
    const mockUser = { id: 0, name: 'User', email: 't@example.com' };
    store.dispatch({
      type: userRegistration.fulfilled.type,
      payload: mockUser
    });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.user).toEqual(mockUser);
    expect(updatedState.isLoading).toBe(false);
  });
  it('user reg rejected', () => {
    store.dispatch({ type: userRegistration.rejected.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });
//check user
  it('check user reg pending', () => {
    const state = store.getState() as AuthState;
    store.dispatch({ type: checkUserAuth.pending.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(true);
  });
  it('check user reg fulfilled', () => {

    store.dispatch({
      type: checkUserAuth.fulfilled.type,
    });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });
  it('check user reg rejected', () => {
    store.dispatch({ type: checkUserAuth.rejected.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });
  //loginUser
  it('login user reg pending', () => {
    const state = store.getState() as AuthState;
    store.dispatch({ type: loginUser.pending.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(true);
  });
  it('login user reg fulfilled', () => {
    const mockUser = { id: 0, name: 'User', email: 't@example.com' };
    store.dispatch({
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.user).toEqual(mockUser);
    expect(updatedState.isLoading).toBe(false);
  });
  it('login user reg rejected', () => {
    store.dispatch({ type: loginUser.rejected.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });

  it('logout user reg fulfilled', () => {
    const mockUser = { id: 0, name: 'User', email: 't@example.com' };
    store.dispatch({
      type: logoutUser.fulfilled.type,
      payload: mockUser
    });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.user).toEqual(null);
    expect(updatedState.isAuth).toBe(true);
  });
//update user
it('update user reg pending', () => {
    const state = store.getState() as AuthState;
    store.dispatch({ type: updateUserAuth.pending.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(true);
  });

  it('update user reg fulfilled', () => {
    store.dispatch({
      type: updateUserAuth.fulfilled.type,
    });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });
  
  it('update user reg rejected', () => {
    store.dispatch({ type: updateUserAuth.rejected.type });
    const updatedState = store.getState() as AuthState;
    expect(updatedState.isLoading).toBe(false);
  });
});
