import React from 'react';
import { Dropdown, Layout, MenuProps } from 'antd';
// import { api } from './../api';

const { Header } = Layout;
import styles from './CustomHeader.module.scss';
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import { Note } from '../../api/Api';
// import { MessageInstance } from 'antd/es/message/interface';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

console.log(styles);

// type Props = {
//   isFullHeader: boolean;
//   isUpdateNoteAndDirList: boolean;
//   setIsUpdateNoteAndDirList: React.Dispatch<React.SetStateAction<boolean>>;
//   currentNote: Note;
//   setCurrentNote: React.Dispatch<React.SetStateAction<Note>>;
//   messageApi: MessageInstance;
// };

type Props = {
  user: User | undefined;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomHeader: React.FC<Props> = ({ user, setIsAuth }) => {
  const navigate = useNavigate();

  const handleClickCreateNewNote = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/create_note');
  };

  const handleClickMainPage = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      disabled: true,
      label: <p>Настройки</p>,
      icon: <SettingOutlined />,
    },
    {
      key: 'exit',
      label: 'Выйти',
      danger: true,
      icon: <LogoutOutlined />,
      onClick: () => {
        setIsAuth(false);
      },
    },
  ];

  return (
    <Header className={styles.headerStyle}>
      <div className={styles.headerLeft}>
        <div className={styles.burgerAndLogo}>
          <div style={{ alignItems: 'center' }}>
            <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
          </div>
          <div className={styles.logo} onClick={handleClickMainPage}>
            EasyTeX
          </div>
        </div>
        <div style={{ alignItems: 'center' }}>
          <PlusCircleOutlined
            style={{ fontSize: '20px' }}
            onClick={handleClickCreateNewNote}
          />
        </div>
      </div>
      <div className={styles.headerRight}>
        {user ? (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
            arrow
          >
            {/* <Button>bottomRight</Button> */}
            <div className={styles.iconContainer}>
              <div>
                <UserOutlined style={{ fontSize: '20px' }} />
              </div>
              <div>
                <div style={{ fontSize: '20px' }}>{user.email}</div>
              </div>
              {/* <div id="coordinates-button"> */}
              {/* <ExportOutlined style={{ fontSize: '20px' }} /> */}
              {/* </div> */}
            </div>
          </Dropdown>
        ) : (
          <div>
            {/* <div className={styles.buttonContainer}>
          <Button type="default" onClick={() => {}}>
            Поделиться
          </Button>
          <Button type="primary">Сохранить</Button>
        </div> */}
          </div>
        )}
      </div>
    </Header>
  );
};

export default CustomHeader;
