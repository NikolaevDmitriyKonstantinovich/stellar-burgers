/* eslint-disable prettier/prettier */
import { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { getIsAuth, loginUser } from '../../services/slices/authSlice';
import { TLoginData } from '../../utils/burger-api';
import { useDispatch, useSelector } from '../../services/store';
import { getCookie, setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector(getIsAuth);
  const handleSubmit = (e: SyntheticEvent<Element, Event>) => {
    const formEvent = e as FormEvent<HTMLFormElement>;
    formEvent.preventDefault();
    const userLoginData: TLoginData = {
      email,
      password
    };
  
    // Передаем данные для логина в dispatch
    // dispatch(loginUser(userLoginData));
    dispatch(loginUser({
      email,
      password
    }))
    const accessToken = getCookie('accessToken');
if (accessToken) {
  console.log('Access Token found in cookies:', accessToken);
} else {
  console.log('No Access Token in cookies');
}

    console.log('userLoginData', userLoginData);
    console.log('handleSubmitLogin');
    // POST https://norma.nomoreparties.space/api/auth/login 401 (Unauthorized)
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
