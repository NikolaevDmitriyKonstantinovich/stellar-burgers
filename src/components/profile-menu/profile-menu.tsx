/* eslint-disable prettier/prettier */
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getIsAuth, logoutUser } from '../../services/slices/authSlice';

export const ProfileMenu: FC = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector(getIsAuth);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      nav('/');
    } catch (error) {
      console.error(error, 'Error logout user');
    }
  };
  useEffect(() => {
    if (!isAuth) {
      nav('/login');
    }
  }, [isAuth, nav]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
