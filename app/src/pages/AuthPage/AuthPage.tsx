import React, { useEffect, useState } from 'react';
import styles from './AuthPage.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

type Props = {
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setIsFirstAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthPage: React.FC<Props> = ({ setIsAuthUser, setIsFirstAuth }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const currentHref = window.location.href;
    const includesAuth = currentHref.includes('auth');
    setIsAuth(includesAuth);

    const gradient = document.getElementById(styles.gradient);
    if (includesAuth) {
      gradient?.classList.add(styles.authGradient);
    } else {
      gradient?.classList.add(styles.regGradient);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);

    if (isAuth) {
      const response = await api.auth.loginCreate({
        email: values.username,
        password: values.password,
      });

      if (response.status === 204) {
        setIsAuthUser(true);
        navigate('/');
      } else {
        if (response.status === 400) {
          console.log('400 auth');
        } else {
          console.log('500 server');
        }
      }
    } else {
      const response = await api.auth.registerUpdate({
        email: values.username,
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        setIsAuthUser(true);
        setIsFirstAuth(true);
        navigate('/');
      } else {
        if (response.status === 409) {
          console.log('409 reg');
        } else {
          console.log('500 server');
        }
      }
    }
  };

  const handleClickTransition = (event: React.MouseEvent) => {
    event.preventDefault();
    const gradient = document.getElementById(styles.gradient);
    console.log(gradient);

    if (isAuth) {
      gradient?.classList.add(styles.animateGradient);
      gradient?.classList.remove(styles.animateGradientBack);
    } else {
      gradient?.classList.remove(styles.animateGradient);
      gradient?.classList.add(styles.animateGradientBack);
    }

    // const lastSlashIndex = window.location.href.lastIndexOf('/');
    // window.location.href =
    //   window.location.href.slice(0, lastSlashIndex + 1) +
    //   (isAuth ? 'reg' : 'auth');
    navigate(isAuth ? '/reg' : '/auth');
    setIsAuth(!isAuth);
  };

  return (
    <div id={styles.gradient} className={`${styles.container}`}>
      <div className={`${styles.authContainer} ${styles.form}`}>
        {isAuth ? (
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px' }}>Авторизация</div>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Введите свой логин' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Логин"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Введите свой пароль' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.login_form_button}
              >
                Войти
              </Button>
              Ещё{' '}
              <a href="" onClick={handleClickTransition}>
                нет аккаунта?
              </a>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px' }}>Регистрация</div>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Введите свой логин' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Логин"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Придумайте новый пароль' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
            <Form.Item
              name="repeated_password"
              rules={[{ required: true, message: 'Повторите свой пароль' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.login_form_button}
              >
                Зарегистрироваться
              </Button>
              Уже{' '}
              <a href="" onClick={handleClickTransition}>
                есть аккаунт?
              </a>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
