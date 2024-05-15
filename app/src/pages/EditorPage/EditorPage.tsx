import React, { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';
import 'katex/dist/katex.css';

import styles from './EditorPage.module.scss';
import { Note, Snippet } from '../../api/Api';
import { api } from '../../api';
import { useParams } from 'react-router-dom';
import { Menu, Dropdown, Divider, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PreviewType } from '@uiw/react-md-editor';
import CreateMirrorDivElement from '../../modules/FindSlashCooddinates';

type Props = {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>; // for adding new snippet
  contextHolder: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
  isUpdateNoteAndDirList: boolean;
  setIsUpdateNoteAndDirList: React.Dispatch<React.SetStateAction<boolean>>;
};

const snippetMenuSizes = {
  width: 250,
  height: 300,
};

const EditorPage: React.FC<Props> = ({
  note,
  setNote,
  snippets,
  contextHolder,
}) => {
  const inputForContextMenuFile = useRef<HTMLInputElement | null>(null);

  const [noteText, setNoteText] = useState<string | undefined>(note.body);

  const [editorMode, setEditorMode] = useState<PreviewType>('preview');

  const [cursorPosition, setCursorPosition] = useState(0);
  const [currentKeyContextMenu, setCurrentKeyContextMenu] = useState('');

  // const [isSnippetsMenu, setIsSnippetsMenu] = useState(false);
  // const [snippetsIndex, setSnippetsIndex] = useState(0);
  const [snippetsContextMenu, setSnippetsContextMenu] = useState<JSX.Element>(
    <></>,
  );

  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [slashIndex, setSlashIndex] = useState(0);
  const [snippetId, setSnippetId] = useState(0);

  const [findSlashFunc, setFindSlashFunc] = useState<
    (() => { y: number; right: number; bottom: number }) | null
  >(null);

  const currentHref = window.location.href;
  const hasNote = currentHref.includes('/note/');
  const hasCreateNote = currentHref.includes('/create_note');

  const { id: strNoteId } = useParams<string>();
  let currentNoteId: number;
  if (hasNote) {
    currentNoteId = Number(strNoteId);
  } else {
    if (hasCreateNote) {
      currentNoteId = -1;
    } else {
      currentNoteId = 528;
    }
  }

  const addHandleToClickOnPreview = () => {
    const previewEditor = document.querySelector('.w-md-editor-preview');

    if (previewEditor === null) {
      setTimeout(addHandleToClickOnPreview, 0);
    }

    previewEditor?.addEventListener('click', () => {
      if (editorMode === 'preview') {
        setEditorMode('live');
      }
    });
  };

  const createTextareaMirror = () => {
    const textareaContainer = document.querySelector('.w-md-editor-text');
    const textarea = document.querySelector('.w-md-editor-text-input ');
    if (textarea && textareaContainer) {
      // console.log(CreateMirrorDivElement(textarea, textareaContainer));
      setFindSlashFunc(CreateMirrorDivElement(textarea, textareaContainer));
    } else {
      console.log('Не успели отрисоваться');
      setTimeout(createTextareaMirror, 0);
    }
  };

  useEffect(() => {
    addHandleToClickOnPreview();

    const previewButton = document.querySelector('[data-name="preview"]');

    previewButton?.addEventListener('click', (event) => {
      event.stopImmediatePropagation();

      setEditorMode('preview');
      addHandleToClickOnPreview();
    });

    const liveButton = document.querySelector('[data-name="live"]');

    liveButton?.addEventListener('click', (event) => {
      event.stopImmediatePropagation();

      if (editorMode !== 'live') {
        setEditorMode('live');
      }
    });

    const editButton = document.querySelector('[data-name="edit"]');

    editButton?.addEventListener('click', (event) => {
      event.stopImmediatePropagation();

      if (editorMode !== 'edit') {
        setEditorMode('edit');
      }
    });

    const checkClickOnSnippetMenu = (e: MouseEvent) => {
      const snippetMenu = document.getElementById('snippetMenu');
      const contextMenu = document.getElementById('contextMenu');

      //@ts-ignore
      if (!snippetMenu?.contains(e.target)) {
        setVisible(false);
        setPosition({ x: 0, y: 0 });
      }

      //@ts-ignore
      if (!contextMenu?.contains(e.target)) {
        setIsOpenContextMenu(false);
      }
    };

    document.addEventListener('click', checkClickOnSnippetMenu);
    return () => {
      document.removeEventListener('click', checkClickOnSnippetMenu);
    };
  }, []);

  useEffect(() => {
    if (editorMode === 'live' || editorMode === 'edit') {
      createTextareaMirror();
    }
  }, [editorMode]);

  useEffect(() => {
    if (currentNoteId > 0) {
      requestOnNote();
    }
    setPosition({ x: 0, y: 0 });
    setVisible(false);
  }, [currentNoteId]);

  useEffect(() => {
    setNoteText(note.body);
  }, [note]);

  useEffect(() => {
    setSnippetsContextMenu(createSnippetsMenu());
  }, [snippets]);

  useEffect(() => {
    if (snippetId === 0 || noteText == undefined || noteText == '') {
      return;
    }
    // let currentText = noteText;
    setNoteText(
      noteText.slice(0, slashIndex) +
        snippets[snippetId - 1].body +
        ' ' +
        noteText.slice(slashIndex + 1),
    );
    // currentText += snippets[snippetId - 1].body;
    // setNoteText(currentText);
    setSnippetId(0);
  }, [snippetId]);

  useEffect(() => {
    return () => {
      setPosition({ x: 0, y: 0 });
      setVisible(false);
    };
  }, []);

  const requestOnNote = async () => {
    try {
      const response = await api.notes.notesDetail(currentNoteId);
      setNote(response.data);

      // console.log(note);
    } catch (error) {
      console.log('Error in requestOntNote: ', error);
    }
  };

  const handleChangeText = (
    value: React.SetStateAction<string | undefined>,
  ) => {
    setNoteText(value);
    setNote((note: Note) => {
      note.body = String(value);
      return note;
    });
  };

  const handleClickSnippet = (event: React.MouseEvent) => {
    // @ts-ignore
    const clickedSnippetsId = Number(event.target.attributes[0].value.at(-1));
    setSnippetId(clickedSnippetsId);
    setVisible(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // @ts-ignore
    const value = e.target.value;
    console.log(value, ' vs ', noteText);
    // setNoteText(value);

    // TODO: продумать логику нахождения нового /
    if (value && String(value)[value.length - 1] === '/') {
      setSlashIndex(value.length - 1);
      if (findSlashFunc) {
        const coords = findSlashFunc();
        const futureContextMenuCoords = { x: 0, y: 0 };
        if (
          document.body.offsetHeight - coords.bottom <=
          snippetMenuSizes.height
        ) {
          futureContextMenuCoords.y = coords.y - snippetMenuSizes.height;
          console.log('снизу не помещается', futureContextMenuCoords);
        } else {
          futureContextMenuCoords.y = coords.bottom;
          console.log('снизу помещается', futureContextMenuCoords);
        }

        if (
          document.body.offsetWidth - coords.right <=
          snippetMenuSizes.width
        ) {
          futureContextMenuCoords.x =
            document.body.offsetWidth - snippetMenuSizes.width;
          console.log('справа не помещается', futureContextMenuCoords);
        } else {
          futureContextMenuCoords.x = coords.right;
          console.log('справа помещается', futureContextMenuCoords);
        }

        setPosition(futureContextMenuCoords);
        setVisible(true);
      } else {
        console.log('findSlashFunc is null');
      }
    } else {
      setVisible(false);
    }
  };

  const handleContextMenuOnEditor = (event: React.MouseEvent) => {
    event.preventDefault();
    // @ts-ignore
    setCursorPosition(event.target.selectionStart);
    setIsOpenContextMenu(true);
  };

  const handleClickInContextMenu = (key: string) => {
    setCurrentKeyContextMenu(key);
    inputForContextMenuFile.current?.click();
    console.log('click the key: ', key);
  };

  async function sendFormData(formData: FormData) {
    try {
      if (currentKeyContextMenu === 'addImage') {
        const response = await fetch(
          'https://smartlectures.ru/api/v1/images/upload',
          {
            method: 'POST',
            body: formData,
          },
        );

        const receivedData = await response.json();

        let currentText = noteText;
        if (cursorPosition == currentText?.length) {
          currentText += `  ![image](${receivedData.src})`;
        } else {
          currentText =
            currentText?.substring(0, cursorPosition) +
            `  ![image](${receivedData.src})` +
            currentText?.substring(cursorPosition, currentText.length);
        }
        setNoteText(currentText);
        setNote((note: Note) => {
          note.body = String(currentText);
          return note;
        });
      } else {
        const response = await fetch(
          'https://smartlectures.ru/api/v1/recognizer/mixed',
          {
            method: 'POST',
            body: formData,
          },
        );
        const receivedData = await response.json();
        console.log(receivedData.text);
        let currentText = noteText;
        if (cursorPosition == currentText?.length) {
          currentText += receivedData.text;
        } else {
          currentText =
            currentText?.substring(0, cursorPosition) +
            receivedData.text +
            currentText?.substring(cursorPosition, currentText.length);
        }
        setNoteText(currentText);
        setNote((note: Note) => {
          note.body = String(currentText);
          return note;
        });
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  const handleChangeInputForContextMenu = async (event: React.ChangeEvent) => {
    const formData = new FormData();
    formData.append(
      currentKeyContextMenu === 'addImage' ? 'image' : 'images',
      // @ts-ignore
      event.target.files[0],
    );
    await sendFormData(formData);
  };

  const createSnippetsMenu = () => {
    return (
      <>
        <InfiniteScroll
          style={{
            width: snippetMenuSizes.width,
            height: snippetMenuSizes.height,
            textAlign: 'left',
          }}
          dataLength={snippets.length}
          next={() => {}}
          hasMore={snippets.length < 50}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          loader={undefined}
        >
          <List
            style={{ paddingLeft: '1em' }}
            dataSource={snippets}
            className={styles.snippet_menu}
            renderItem={(item) => (
              <List.Item
                key={item.snippetId}
                className={`${item.snippetId}`}
                style={{ padding: 0, cursor: 'pointer' }}
                onClick={handleClickSnippet}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </>
    );
  };

  const menu = (
    <Menu
      id="contextMenu"
      onClick={({ key }) => {
        handleClickInContextMenu(key);
      }}
      items={[
        { label: 'Вставить фото', key: 'addImage' },
        {
          label: 'Преобразовать',
          key: 'paste',
          children: [
            { label: 'Фото текста', key: 'pasteText' },
            { label: 'Фото формулы', key: 'pasteMath' },
          ],
        },
        {
          label: 'Добавить фото конспекта',
          key: 'pasteMix',
        },
      ]}
    ></Menu>
  );

  // TODO: поменять высоту редактора, чтобы был почти до конца экрана
  // TODO: сохранять размеры (координаты правого нижнего угла) textarea
  // TODO: опираться при отрисовке ContextMenu не body, а размеров textarea

  //TODO: сделать остальные пункты по сниппетам, поиск
  //TODO: авторизация, регистрация

  return (
    <div className="payload_list_container" style={{ flexGrow: '1' }}>
      {contextHolder}
      <>
        <div className={styles.editor} data-color-mode="light">
          {/* {snippetsContextMenu} */}
          {visible && (
            <div
              id="snippetMenu"
              style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                zIndex: 1000,
              }}
            >
              {snippetsContextMenu}
            </div>
          )}
          <Dropdown
            overlay={menu}
            open={isOpenContextMenu}
            onOpenChange={setIsOpenContextMenu}
            trigger={['contextMenu']}
          >
            <MDEditor
              value={noteText}
              height={'90%'}
              onChange={handleChangeText}
              onContextMenu={handleContextMenuOnEditor}
              onKeyUp={handleKeyUp}
              preview={editorMode}
              previewOptions={{
                components: {
                  code: ({ children = [], className, ...props }) => {
                    if (
                      typeof children === 'string' &&
                      /^\$\$(.*)\$\$/.test(children)
                    ) {
                      const html = katex.renderToString(
                        children.replace(/^\$\$(.*)\$\$/, '$1'),
                        {
                          throwOnError: false,
                        },
                      );
                      return (
                        <code
                          dangerouslySetInnerHTML={{ __html: html }}
                          style={{ background: 'transparent' }}
                        />
                      );
                    }
                    const code =
                      // eslint-disable-next-line react/prop-types
                      props.node && props.node.children
                        ? // eslint-disable-next-line react/prop-types
                          getCodeString(props.node.children)
                        : children;
                    if (
                      typeof code === 'string' &&
                      typeof className === 'string' &&
                      /^language-katex/.test(className.toLocaleLowerCase())
                    ) {
                      const html = katex.renderToString(code, {
                        throwOnError: false,
                      });
                      return (
                        <code
                          style={{ fontSize: '150%' }}
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    }
                    return (
                      <code className={String(className)}>{children}</code>
                    );
                  },
                },
              }}
            />
          </Dropdown>
        </div>

        <input
          type="file"
          accept=".jpeg,.png,.svg"
          ref={inputForContextMenuFile}
          style={{ display: 'none' }}
          onChange={handleChangeInputForContextMenu}
        ></input>
      </>
    </div>
  );
};

export default EditorPage;

// на доработку логика возникновения меню сниппетов
/**const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // @ts-ignore
    const value = e.target.value;
    const currentIndex = value.length - 1;
    // setNoteText(value);

    // TODO: продумать логику нахождения нового /
    if (value && String(value).includes('/')) {
      if (!slashArray.includes(currentIndex)) {
        setSlashArray((prevIndexes) => [...prevIndexes, currentIndex]);
        setSlashIndex(value.length - 1);
        if (findSlashFunc) {
          const coords = findSlashFunc();
          const futureContextMenuCoords = { x: 0, y: 0 };
          if (
            document.body.offsetHeight - coords.bottom <=
            snippetMenuSizes.height
          ) {
            futureContextMenuCoords.y = coords.y - snippetMenuSizes.height;
            console.log('снизу не помещается', futureContextMenuCoords);
          } else {
            futureContextMenuCoords.y = coords.bottom;
            console.log('снизу помещается', futureContextMenuCoords);
          }

          if (
            document.body.offsetWidth - coords.right <=
            snippetMenuSizes.width
          ) {
            futureContextMenuCoords.x =
              document.body.offsetWidth - snippetMenuSizes.width;
            console.log('справа не помещается', futureContextMenuCoords);
          } else {
            futureContextMenuCoords.x = coords.right;
            console.log('справа помещается', futureContextMenuCoords);
          }

          setPosition(futureContextMenuCoords);
          setVisible(true);
        } else {
          console.log('findSlashFunc is null');
        }
      } else {
        setVisible(false);
      }
    } else {
      setVisible(false);
    }
  }; */
