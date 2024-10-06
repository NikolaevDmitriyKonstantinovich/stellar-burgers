/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import path from 'path';
import { useEffect } from 'react';
import { AppDispatch, useDispatch } from '../../services/store';
import { getIngridients } from '../../services/slices/getIngridientsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/slices/authSlice';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state?.background;
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onClose = () => {
    nav(-1);
  }
  useEffect(() => {
    dispatch(checkUserAuth);
    console.log('App useEffect');
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute forNotAuth={true}><Login /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute forNotAuth={true}><Register /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute forNotAuth={true}><ForgotPassword /></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='информация заказа'
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={onClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={onClose
                }
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
