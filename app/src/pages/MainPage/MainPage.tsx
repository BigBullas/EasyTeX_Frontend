import styles from './MainPage.module.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Flex, message } from 'antd';
import { Resizable } from 're-resizable';

const { Sider, Content } = Layout;

import CustomMenu from '../../components/CustomMenu';
import Search from 'antd/es/input/Search';
import CustomHeader from '../../components/CustomHeader';
import { Note, Snippet } from '../../api/Api';
import EditorPage from '../../pages/EditorPage';
import CreationPage from '../../pages/CreationPage';
import CustomFindContainer from '../../components/CustomFindContainer';
import { api } from '../../api';
import HeaderInEditorPage from '../../components/HeaderInEditorPage';
import { User } from '../../types';

console.log(styles);

type Props = {
  isAuth: boolean | undefined;
  isFirstAuth: boolean;
  user: User | undefined;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const MainPage: React.FC<Props> = ({ isAuth, user, setIsAuth }) => {
  const navigate = useNavigate();
  const [isUpdateNoteAndDirList, setIsUpdateNoteAndDirList] =
    React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const [noteList, setNotelist] = React.useState<NotePreview[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({});
  const [findValue, setFindValue] = useState<string>('');
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const handleChangeFindValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFindValue(event.target.value);
  };

  const handleEventFindValue = (newValue: string) => {
    setFindValue(newValue);
  };

  const requestSnippets = async () => {
    const response = await api.snippets.snippetsList({
      withCredentials: true,
    });
    setSnippets(response.data.snippets);
  };

  useEffect(() => {
    requestSnippets();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate('/home');
    }
  }, [isAuth]);

  return (
    <Flex
      gap="middle"
      wrap="wrap"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Layout style={layoutStyle}>
        <CustomHeader user={user} setIsAuth={setIsAuth} />
        <Layout style={{ flexGrow: '1' }}>
          <Resizable
            maxWidth={'650px'}
            minWidth={'150px'}
            defaultSize={{
              width: '260px',
              height: '100%',
            }}
          >
            <Sider className={styles.siderStyle} width={'100%'}>
              {/* вынести в отдельный компонент */}
              <Search
                placeholder="Поиск"
                allowClear
                onChange={handleChangeFindValue}
                onSearch={handleEventFindValue}
                value={findValue}
                style={{
                  width: '80%',
                  margin: '1em 0',
                  paddingLeft: '24px',
                }}
              />
              {!findValue ? (
                // поменять название на FolderMenu или меню иерархии
                <CustomMenu
                  currentNote={currentNote}
                  setCurrentNote={setCurrentNote}
                  isUpdate={isUpdateNoteAndDirList}
                  setIsUpdate={setIsUpdateNoteAndDirList}
                ></CustomMenu>
              ) : (
                <CustomFindContainer
                  findValue={findValue}
                ></CustomFindContainer>
              )}
            </Sider>
          </Resizable>

          <Content style={contentStyle}>
            {/* <CustomBreadcrumb /> */}
            <Routes>
              <Route
                path="/"
                element={
                  // TODO: здесь будет новый компонент главной страницы
                  <EditorPage
                    isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                    setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                    note={currentNote}
                    setNote={setCurrentNote}
                    snippets={snippets}
                    setSnippets={setSnippets}
                    contextHolder={contextHolder}
                  ></EditorPage>
                }
              />
              <Route
                path="/create_note/"
                element={
                  <CreationPage
                    isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                    setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                    note={currentNote}
                    setNote={setCurrentNote}
                    contextHolder={contextHolder}
                  ></CreationPage>
                }
              ></Route>
              <Route
                path="/note/:id"
                element={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <HeaderInEditorPage
                      isFullHeader={false}
                      currentNote={currentNote}
                      messageApi={messageApi}
                      setCurrentNote={setCurrentNote}
                      isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                      setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                    />
                    <EditorPage
                      isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                      setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                      note={currentNote}
                      setNote={setCurrentNote}
                      snippets={snippets}
                      setSnippets={setSnippets}
                      contextHolder={contextHolder}
                    ></EditorPage>
                  </div>
                }
              />
              <Route
                path="/dir/:id"
                element={
                  <h1>Страница списка папок и файлов определённой папки</h1>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default MainPage;

// TODO: закинуть в scss файл

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '100%',
  color: 'black',
  // backgroundColor: '#f0f2f5',
  margin: '1.5em 5em',
};

// const siderStyle: React.CSSProperties = {
//   height: '100%',
//   textAlign: 'center',
//   color: '#black',
//   backgroundColor: '#FFFFFF',
// };

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

{
  /* <Routes>
                  <Route
                    path="/note/:id"
                    element={
                      <CustomHeader
                        isFullHeader
                        currentNote={currentNote}
                        messageApi={messageApi}
                        setCurrentNote={setCurrentNote}
                        isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                        setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                      ></CustomHeader>
                    }
                  />
                  <Route
                    path="/create_note"
                    element={
                      <CustomHeader
                        isFullHeader
                        currentNote={currentNote}
                        messageApi={messageApi}
                        setCurrentNote={setCurrentNote}
                        isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                        setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                      ></CustomHeader>
                    }
                  />
                  <Route
                    path="/*"
                    element={
                      <CustomHeader
                        isFullHeader={false}
                        currentNote={currentNote}
                        messageApi={messageApi}
                        setCurrentNote={setCurrentNote}
                        isUpdateNoteAndDirList={isUpdateNoteAndDirList}
                        setIsUpdateNoteAndDirList={setIsUpdateNoteAndDirList}
                      ></CustomHeader>
                    }
                  />
                </Routes> */
}
