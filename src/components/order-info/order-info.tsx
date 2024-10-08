/* eslint-disable prettier/prettier */
import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngridients, selectIngredients } from '../../services/slices/getIngridientsSlice';
import { getOrderbyNumber, getOrders, selectOrder, selectOrderById } from '../../services/slices/orderSlice';
import { selectOrders } from '../../services/slices/mainPageSlice';

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
  const { number } = useParams<{ number: string }>();
  console.log('current page id', number);
  // const orderData = useSelector((state) =>
  //   state.order.order && state.order.order.number === Number(id)
  //   ? state.order.order  
  //   : null 
  // );

  const allOrders = useSelector(selectOrders);
  console.log('select orders', useSelector(selectOrders));
  // console.log('orderData oi21', orderData);
  console.log('allOrders', allOrders);
  // const orderData = allOrders.find(order => order.number === Number(number));
  // const orderData = useSelector(selectOrderById(Number(number)));
  // const orderD = orderData
  const orderData = useSelector((state) =>
    state.order.order && state.order.order.number === Number(number)
      ? state.order.order
      : null);
  console.log('Current state order info:', useSelector(state => state));
  console.log('OrderInfo orderData3', orderData);
  const dispatch = useDispatch();


  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    // dispatch(getOrders());
    dispatch(getOrderbyNumber(Number(number)));
    console.log('OrderInfo useEffect', orderData);
  }, [dispatch, number]);

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
  console.log('OrderInfo 3', orderInfo); //null
  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
