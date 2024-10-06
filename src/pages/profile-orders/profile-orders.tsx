import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectOrders } from '../../services/slices/mainPageSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
