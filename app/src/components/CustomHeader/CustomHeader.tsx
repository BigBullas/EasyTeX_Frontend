import React from 'react';
import { Layout } from 'antd';
// import { api } from './../api';

const { Header } = Layout;
import styles from './CustomHeader.module.scss';
import {
  DeleteOutlined,
  ExportOutlined,
  FileImageOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
// import { Note } from '../../api/Api';
// import { MessageInstance } from 'antd/es/message/interface';
import { useNavigate } from 'react-router-dom';

console.log(styles);

// type Props = {
//   isFullHeader: boolean;
//   isUpdateNoteAndDirList: boolean;
//   setIsUpdateNoteAndDirList: React.Dispatch<React.SetStateAction<boolean>>;
//   currentNote: Note;
//   setCurrentNote: React.Dispatch<React.SetStateAction<Note>>;
//   messageApi: MessageInstance;
// };

const CustomHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleClickCreateNewNote = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/create_note');
  };

  const handleClickMainPage = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/');
  };

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
        <div className={styles.iconContainer}>
          <div>
            <FileImageOutlined style={{ fontSize: '20px' }} />
          </div>
          <div>
            <DeleteOutlined style={{ fontSize: '20px' }} />
          </div>
          <div id="coordinates-button">
            <ExportOutlined style={{ fontSize: '20px' }} />
          </div>
        </div>
        {/* <div className={styles.buttonContainer}>
            <Button type="default" onClick={() => {}}>
              Поделиться
            </Button>
            <Button type="primary">Сохранить</Button>
          </div> */}
      </div>
    </Header>
  );
};

export default CustomHeader;
