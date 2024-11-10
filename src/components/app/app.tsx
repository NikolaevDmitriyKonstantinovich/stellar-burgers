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
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import path from 'path';
import { useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '../../services/store';
import { getIngridients } from '../../services/slices/getIngridientsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/slices/authSlice';
import { getCookie } from '../../utils/cookie';
import { deleteOrder } from '../../services/slices/orderSlice';

const App = () => {
  const location = useLocation();
  const background = location.state as { background?: Location } && location.state?.background;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const profileOrderNumb = useMatch('/profile/orders/:number')?.params.number;
  const feedOrderNumb = useMatch('/feed/:number')?.params.number;
  const orderNumber = feedOrderNumb || profileOrderNumb;
  const onClose = () => {
    dispatch(deleteOrder())
    nav(-1);
  }
  useEffect(() => {
    dispatch(checkUserAuth())
    .unwrap()
    .catch((error) => {
      console.error('Error during user authentication check:', error);
    });
    const accessToken = getCookie('accessToken');
    console.log('app Access Token:', accessToken);
    console.log('App useEffect');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('app Refresh Token:', refreshToken);
    dispatch(getIngridients());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

const handleModalOpen = () => setIsModalOpen(true);
const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute forNotAuth={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute forNotAuth={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute forNotAuth={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <IngredientDetails />
            </div>
          }
        />{' '}
        {/* Отдельный маршрут для деталей */}
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />{' '}
        {/* Отдельный маршрут для OrderInfo */}
        <Route
          path='/profile/orders/:number'
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />{' '}
        {/* Отдельный маршрут для профиля заказов */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && ('000000' + orderNumber).slice(-6)}`}
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && ('000000' + orderNumber).slice(-6)}`}
                onClose={onClose}
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
