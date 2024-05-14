/**
 <div className={styles.headerRight}>
          <div className={styles.documentTitle}>
            <div style={{ alignItems: 'center' }}>
              <Input
                value={currentNoteTitle}
                placeholder="Новый документ"
                onChange={handleUpdateTitle}
              />
            </div>
            <div style={{ alignItems: 'center' }}>
              <EditOutlined
                style={{ fontSize: '20px' }}
                onClick={handleClickUpdateTitle}
              />
            </div>
          </div>
          <div className={styles.documentInstruments}>
            <div className={styles.iconContainer}>
              <div>
                <FileImageOutlined style={{ fontSize: '20px' }} />
              </div>
              <div>
                <DeleteOutlined
                  style={{ fontSize: '20px' }}
                  onClick={handleClickDeleteNote}
                />
              </div>
              <div>
                <ExportOutlined
                  style={{ fontSize: '20px' }}
                  onClick={handleClickExportNote}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button type="default" onClick={() => {}}>
                Поделиться
              </Button>
              <Button type="primary" onClick={handleUpdateNote}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
 */

import React, { useEffect, useState } from 'react';
import styles from './HeaderInEditorPage.module.scss';

import { Input } from 'antd';
// import { api } from './../api';

import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FileImageOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import { api } from '../../api';
import { MessageInstance } from 'antd/es/message/interface';
import { Note } from '../../api/Api';
import { useNavigate } from 'react-router-dom';

console.log(styles);

type Props = {
  isFullHeader: boolean;
  isUpdateNoteAndDirList: boolean;
  setIsUpdateNoteAndDirList: React.Dispatch<React.SetStateAction<boolean>>;
  currentNote: Note;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note>>;
  messageApi: MessageInstance;
};

const CustomBreadcrumb: React.FC<Props> = ({
  isUpdateNoteAndDirList,
  setIsUpdateNoteAndDirList,
  currentNote,
  setCurrentNote,
  messageApi,
}) => {
  const navigate = useNavigate();
  const [currentNoteTitle, setCurrentNoteTitle] = useState(currentNote.name);

  useEffect(() => {
    setCurrentNoteTitle(currentNote.name);
  }, [currentNote]);

  const requestNote = async (id: number) => {
    try {
      const response = await api.notes.notesDetail(id);

      console.log(response.data);

      setCurrentNote(response.data);
      setIsUpdateNoteAndDirList(!isUpdateNoteAndDirList);

      navigate(`/note/${id}`);
      // TODO: добавить link на страницу редактирования пустой заметки
    } catch (error) {
      console.log('Error in requestNote: ', error);
    }
  };

  const requestUpdateNote = async () => {
    try {
      if (currentNote.noteId) {
        const response = await api.notes.notesUpdate(
          currentNote.noteId,
          currentNote,
        );
        console.log(response.status);
        messageApi.open({
          type: 'success',
          content: 'Конспект успешно обновлён',
        });
      } else {
        if (currentNote.noteId === 0) {
          try {
            const response = await api.notes.notesCreate(currentNote);

            console.log(response.data.noteId);

            requestNote(response.data.noteId);
            messageApi.open({
              type: 'success',
              content: 'Конспект успешно обновлён',
            });
          } catch (error) {
            console.log('Error in requestUpdateNote: ', error);
          }
        }
      }
    } catch (error) {
      console.log('Error in requestUpdateNote: ', error);
    }
  };

  const requestDeleteNote = async () => {
    try {
      if (currentNote.noteId) {
        const response = await api.notes.notesDelete(currentNote.noteId);

        console.log(response.status);
        // TODO: messageHolder утащить в другое место
        // messageApi.open({
        //   type: 'success',
        //   content: 'Конспект успешно удалён',
        // });
      }
    } catch (error) {
      console.log('Error in requestDeleteNote: ', error);
    }
  };

  const handleUpdateNote = (event: React.MouseEvent) => {
    event.preventDefault();
    requestUpdateNote();
  };

  const handleUpdateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedTitle = event.target.value;
    setCurrentNoteTitle(changedTitle);
    setCurrentNote((oldNote) => {
      oldNote.name = changedTitle;
      return oldNote;
    });
  };

  const handleClickUpdateTitle = async (event: React.MouseEvent) => {
    event.preventDefault();
    await requestUpdateNote();
    setIsUpdateNoteAndDirList(!isUpdateNoteAndDirList);
  };

  const handleClickDeleteNote = async (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentNote({});
    setCurrentNoteTitle(undefined);
    setIsUpdateNoteAndDirList(!isUpdateNoteAndDirList);
    await requestDeleteNote();
    navigate('/');
  };

  const handleClickExportNote = async (event: React.MouseEvent) => {
    event.preventDefault();

    const response = await api.notes.downloadMdDetail(currentNote.noteId ?? 0);
    console.log(response.data);

    // // Создаем Blob из полученных данных с типом MIME для Markdown
    const blob = new Blob([response.data], { type: 'text/markdown' });

    // // Создаем URL для Blob
    const url = URL.createObjectURL(blob);

    // // Создаем элемент <a> для загрузки файла
    const link = document.createElement('a');
    link.href = url;
    link.download = (currentNote.name ?? 'Новый файл') + '.md'; // Имя файла с расширением .md
    // document.body.appendChild(link); // Добавляем элемент в DOM
    link.click(); // Инициируем загрузку
    // document.body.removeChild(link); // Удаляем элемент из DOM
  };

  return (
    <div>
      <div className={styles.headerRight}>
        <div className={styles.documentTitle}>
          <div style={{ alignItems: 'center' }}>
            <Input
              className={styles.input}
              value={currentNoteTitle}
              placeholder="Новый документ"
              onChange={handleUpdateTitle}
            />
          </div>
          {/* убрать карандаш */}
          <div style={{ alignItems: 'center' }}>
            <EditOutlined
              style={{ fontSize: '20px' }}
              onClick={handleClickUpdateTitle}
            />
          </div>
        </div>
        <div className={styles.documentInstruments}>
          <div className={styles.iconContainer}>
            <div>
              <FileImageOutlined style={{ fontSize: '20px' }} />
            </div>
            <div>
              <DeleteOutlined
                style={{ fontSize: '20px' }}
                onClick={handleClickDeleteNote}
              />
            </div>
            <div>
              <ExportOutlined
                style={{ fontSize: '20px' }}
                onClick={handleClickExportNote}
              />
            </div>
            <div>
              <SaveOutlined
                style={{ fontSize: '20px' }}
                onClick={handleUpdateNote}
              />
            </div>
          </div>
          {/* <div className={styles.buttonContainer}>
            <Button type="default" onClick={() => {}}>
              Поделиться
            </Button>
            <Button type="primary" onClick={handleUpdateNote}>
              Сохранить
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomBreadcrumb;
