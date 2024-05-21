import React from 'react';
import styles from './Lending.module.scss';

console.log(styles);

type Props = {
  isAuth: boolean | undefined;
};

const Lending: React.FC<Props> = ({ isAuth }) => {
  return (
    <div>
      {isAuth ? (
        <h1>Главная страница авторизованного пользоватя</h1>
      ) : (
        <h1>Главная страница</h1>
      )}
    </div>
  );
};

export default Lending;
