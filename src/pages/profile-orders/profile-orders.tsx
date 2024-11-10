import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed } from '../../services/slices/mainPageSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, selectOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  // получаем orders в redux перед загрузкой истории профайла
  useEffect(() => {
    dispatch(getFeed());
    console.log('profile orders useEffect');
  }, []);
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
