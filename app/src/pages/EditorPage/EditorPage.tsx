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

console.log(styles);

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

const EditorPage: React.FC<Props> = ({
  note,
  setNote,
  snippets,
  contextHolder,
}) => {
  const inputForContextMenu = useRef<HTMLInputElement | null>(null);

  const [noteText, setNoteText] = useState<string | undefined>(note.body);

  const [editorMode, setEditorMode] = useState<PreviewType>('preview');

  const [cursorPosition, setCursorPosition] = useState(0);
  const [currentKeyContextMenu, setCurrentKeyContextMenu] = useState('');

  // const [isSnippetsMenu, setIsSnippetsMenu] = useState(false);
  // const [snippetsIndex, setSnippetsIndex] = useState(0);
  const [snippetsContextMenu, setSnippetsContextMenu] = useState<JSX.Element>(
    <></>,
  );

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [findSlashFunc, setFindSlashFunc] = useState<
    (() => { x: number; y: number }) | null
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
      currentNoteId = 25;
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
  }, [currentNoteId]);

  useEffect(() => {
    setNoteText(note.body);
  }, [note]);

  useEffect(() => {
    setSnippetsContextMenu(createSnippetsMenu());
  }, [snippets]);

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

    // if (value && String(value)[value.length - 1] === '/') {
    //   console.log('123');
    //   if (findSlashFunc) {
    //     console.log('result: ', findSlashFunc);
    //     // console.log('/', findSlashFunc());
    //     setPosition(findSlashFunc);
    //   }
    //   setVisible(true);
    // }
    // if (value && String(value)[value.length - 1] === '/') {
    //   setIsSnippetsMenu(true);
    //   setSnippetsIndex(value.length - 1);
    //   console.log('isSnippetMenu');
    // } else {
    //   if (
    //     value &&
    //     isSnippetsMenu &&
    //     (value?.length < snippetsIndex || value.length - snippetsIndex > 5)
    //   ) {
    //     setIsSnippetsMenu(false);
    //     console.log('off SnippetMenu');
    //   }
    // }
  };

  const handleClickSnippet = (event: React.MouseEvent) => {
    // @ts-ignore
    const clickedSnippetsId = Number(event.target.attributes[0].value.at(-1));

    // повторяется код в 3 местах
    let currentText = noteText;
    currentText += snippets[clickedSnippetsId - 1].body;
    // const lastIndex = currentText?.lastIndexOf('/');
    // console.log(lastIndex);
    // if (lastIndex == currentText?.length) {
    //   currentText += snippets[clickedSnippetsId - 1].body;
    // } else {
    //   currentText =
    //     currentText?.substring(0, lastIndex) +
    //     snippets[clickedSnippetsId - 1].body +
    //     currentText?.substring(lastIndex ?? 0, currentText.length);
    // }

    setNoteText(currentText);
    setNote((note: Note) => {
      note.body = String(currentText);
      return note;
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // @ts-ignore
    const value = e.target.value;

    // TODO: продумать логику нахождения нового /

    if (value && String(value)[value.length - 1] === '/') {
      // Получаем позицию курсора в тексте
      // @ts-ignore
      // const cursorPosition = e.target.selectionStart;
      // // Получаем координаты курсора
      // // @ts-ignore
      // const rect = e.target.getBoundingClientRect();
      // const x = rect.left + (cursorPosition + 1) * 7;
      // const y = rect.top;

      // const x = rect.left + window.scrollX + cursorPosition * 8; // Приблизительное значение ширины символа
      // const y = rect.top + window.scrollY;
      if (findSlashFunc) {
        setPosition(findSlashFunc());
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
  };

  const handleClickInContextMenu = (key: string) => {
    setCurrentKeyContextMenu(key);
    inputForContextMenu.current?.click();
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
            width: '250px',
            height: '300px',
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

  return (
    <div className="payload_list_container">
      {contextHolder}
      <>
        <div className={styles.editor} data-color-mode="light">
          {/* {snippetsContextMenu} */}
          {visible && (
            <div
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
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <MDEditor
              value={noteText}
              height={700}
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
          ref={inputForContextMenu}
          style={{ display: 'none' }}
          onChange={handleChangeInputForContextMenu}
        ></input>
      </>
    </div>
  );
};

export default EditorPage;
