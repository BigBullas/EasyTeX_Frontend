// import styles from './App.module.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { Layout, Flex, message } from 'antd';
// import { Resizable } from 're-resizable';
// import { api } from './../api';

// const { Sider, Content } = Layout;

// import CustomMenu from '../components/CustomMenu';
// import Search from 'antd/es/input/Search';
// import CustomHeader from '../components/CustomHeader';
// import { Note, Snippet } from '../api/Api';
// import EditorPage from '../pages/EditorPage';
// import CreationPage from '../pages/CreationPage';
// import CustomFindContainer from '../components/CustomFindContainer';
import { api } from '../api';
// import HeaderInEditorPage from '../components/HeaderInEditorPage';
import AuthPage from '../pages/AuthPage';
import MainPage from '../pages/MainPage';
import { Notification, User } from '../types';
import Lending from '../pages/Lending';
import { message } from 'antd';
// import CustomBreadcrumb from '../components/CustomBreadcrumb';

const App: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuth, setIsAuth] = useState(false);
  const [isFirstAuth, setIsFirstAuth] = useState(false);

  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );

  useEffect(() => {
    console.log('notification: ', notification);
    if (notification == undefined) {
      return;
    }
    message[notification.type](notification.data);
  }, [notification]);

  const requestUser = async () => {
    const response = await api.auth.getAuth({ withCredentials: true });
    if (response.status === 200) {
      console.log('get user: ', response.data);
      setUser(response.data);
    } else {
      if (response.status === 401) {
        console.log('get user: 401');
        navigate('/home');
        setNotification({
          type: 'error',
          data: 'Истекла сессия пользователя, авторизируйтесь повторно',
        });
      } else {
        console.log('get user: 500');
        setNotification({
          type: 'error',
          data: 'Потеряна связь с сервером',
        });
      }
    }
  };

  const requestLogout = async () => {
    const response = await api.auth.logoutDelete();
    if (response.status === 200) {
      setUser(undefined);
    } else if (response.status === 500) {
      console.log('get user: 500');
      setNotification({
        type: 'error',
        data: 'Потеряна связь с сервером',
      });
    } else {
      console.log('Error in logout: ', response);
    }
  };

  useEffect(() => {
    console.log('isAuth: ', isAuth);
    if (isAuth) {
      console.log('setUser: ', isAuth);
      requestUser();
    } else {
      console.log('setUser: undefined');
      requestLogout();
    }
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path="/home" element={<Lending isAuth={isAuth} />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              setIsAuthUser={setIsAuth}
              setIsFirstAuth={setIsFirstAuth}
            />
          }
        />
        <Route
          path="/reg"
          element={
            <AuthPage
              setIsAuthUser={setIsAuth}
              setIsFirstAuth={setIsFirstAuth}
            />
          }
        />
        <Route
          path="/*"
          element={
            <MainPage
              isAuth={isAuth}
              isFirstAuth={isFirstAuth}
              setIsAuth={setIsAuth}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
