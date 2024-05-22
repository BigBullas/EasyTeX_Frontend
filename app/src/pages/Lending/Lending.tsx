import React from 'react';
import './Lending.css';
import { Link } from 'react-router-dom';
// import ChangingImgModal from '../../components/ChangingImgModal';

// console.log(styles);

type Props = {
  isAuth: boolean | undefined;
};

const Lending: React.FC<Props> = ({ isAuth }) => {
  return (
    <div>
      <div className="container">
        <div
          className="navbar"
          style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
        >
          <div className="logo">EasyTex</div>
          <div className="menu">
            <a href="#">Функционал</a>
            <a href="#">Команда</a>
            <a href="#">Начать работу</a>
          </div>
          {isAuth ? (
            <div className="auth">
              <Link className="btn" to={'/reg'}>
                Регистрация
              </Link>
              <Link className="btn" to={'/auth'}>
                Войти
              </Link>
            </div>
          ) : (
            <div className="auth">
              <Link className="btn" to={'/reg'}>
                Регистрация
              </Link>
              <Link className="btn" to={'/auth'}>
                Войти
              </Link>
            </div>
          )}
        </div>
        <div className="main-content">
          <div className="bg-box">
            <img
              className="bg-box"
              src="product_photo.png"
              // style={{ width: '600px', height: '350px' }}
            />
          </div>
          <div className="content_container">
            <div className="text">
              <p>Работать с конспектами</p>
              <p>
                никогда не было так <span>легко</span>
              </p>
            </div>
            <div className="button">
              <Link id="button" to={'/auth'}>
                Начать работу →
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* {isAuth ? (
        <h1>Главная страница авторизованного пользоватя</h1>
      ) : (
        <h1>Главная страница</h1>
      )} */}
      {/* <ChangingImgModal></ChangingImgModal> */}
    </div>
  );
};

export default Lending;
