import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed, selectOrders } from '../../services/slices/mainPageSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  // const orders: TOrder[] = [];
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getFeed());
    console.log('Feed useEffect', orders);
  }, []);
  console.log('Feed useEffect2', orders);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
