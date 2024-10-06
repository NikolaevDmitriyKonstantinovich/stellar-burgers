/* eslint-disable prettier/prettier */
import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngridients } from '../../services/slices/getIngridientsSlice';
import { getOrderbyNumber, getOrders, selectOrder, selectOrderById } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  // const orderData = {
  //   createdAt: '',
  //   ingredients: [],
  //   _id: '',
  //   status: '',
  //   name: '',
  //   updatedAt: 'string',
  //   number: 0
  // };
  // const ingredients: TIngredient[] = useSelector(getIngridients);
  const {id} = useParams();
  const orderData = useSelector(selectOrderById(Number(id)));
  // const orderD = orderData
  // const orderData = useSelector((state) =>
  //   state.order.order && state.order.order.number === Number(id)
  //     ? state.order.order
  //     : null);
  console.log('Current state order info:', useSelector(state => state));
  console.log('OrderInfo orderData', orderData);
  const dispatch = useDispatch();


  const ingredients: TIngredient[] = [];

  useEffect(() => {
    // dispatch(getOrders());
    dispatch(getOrderbyNumber(Number(id)));
    console.log('OrderInfo useEffect', orderData);
  }, [dispatch, id]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
