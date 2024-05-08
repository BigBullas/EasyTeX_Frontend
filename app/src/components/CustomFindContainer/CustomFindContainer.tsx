import React, { useEffect, useState } from 'react';
import styles from './CustomFindContainer.module.scss';
import { Collapse, Empty } from 'antd';
import { NoteSearchItem } from '../../api/Api';
import { api } from '../../api';
import { useDebouncedCallback } from 'use-debounce';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Panel } = Collapse;

console.log(styles);

type Props = {
  findValue: string;
};

/**  Заглушки для поиска
 * {
      noteId: 98,
      name: 'TestName',
      nameHighlight: ['asddf', 'asdfasdf'],
      bodyHighlight: [
        'asfasd sadjfhasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asdf as df asdf  asdf asd f sa df asd fa sdfasdf as df asdf as df asdf  <em>sad</em> fas df asdf as df sadf as',
        'asdfasdasdfasdsadfasfdfasdfasdasdfasdfasdfsdfasfasdf',
        'sadfasdf',
      ],
    },
    {
      noteId: 22,
      name: 'TestName 2',
      nameHighlight: ['asddf 2', 'asdfasdf'],
      bodyHighlight: [
        'asfasd 2 sadjfhasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asdf as df asdf  asdf asd f sa df asd fa sdfasdf as df asdf as df asdf  <em>sad</em> fas df asdf as df sadf as',
        'asdfasdasdfasdsadfasfdfasdfasdasdfasdfasdfsdfasfasdf',
        'sadfasdf 2',
      ],
    },
    {
      noteId: 103,
      name: 'TestName 3',
      nameHighlight: ['asddf 3', 'asdfasdf'],
      bodyHighlight: [],
    },
    {
      noteId: 4,
      name: 'TestName 4',
      nameHighlight: ['asddf 4', 'asdfasdf'],
      bodyHighlight: [],
    }, */

const CustomFindContainer: React.FC<Props> = ({ findValue }) => {
  const [findList, setFindList] = useState<NoteSearchItem[]>([]);
  const [activeFindList, setActiveFindList] = useState<number[]>([]);

  const requestFindList = async () => {
    const response = await api.notes.searchCreate({ query: findValue });
    console.log('find: ', response);
    if (response.status === 200) {
      setFindList(response.data.items);
    } else {
      console.log('errr');
    }
  };

  const debouncedSearch = useDebouncedCallback(
    // function
    requestFindList,
    // delay in ms
    300,
  );

  useEffect(() => {
    if (findValue) {
      debouncedSearch();
    }
  }, [findValue]);

  useEffect(() => {
    setActiveFindList(findList.map((item) => item.noteId));
  }, [findList]);

  return (
    <div>
      <Collapse
        bordered={false}
        // @ts-ignore
        expandIcon={({ isActive, panelKey }) => {
          const handleClick = () => {
            const currentKey = Number(panelKey);
            if (isActive) {
              setActiveFindList(
                activeFindList.filter((item) => item !== currentKey),
              );
            } else {
              activeFindList.push(currentKey);
              setActiveFindList(activeFindList);
            }
          };
          return (
            <div>
              {isActive ? (
                <UpOutlined onClick={handleClick} />
              ) : (
                <DownOutlined onClick={handleClick} />
              )}
            </div>
          );
        }}
        activeKey={activeFindList}
        collapsible="icon"
      >
        {findList.map((item) => {
          if (!item.nameHighlight) {
            item.nameHighlight = [item.name];
          }
          if (item.bodyHighlight && item.bodyHighlight.length > 0) {
            return (
              <Panel
                key={item.noteId}
                className="asdfasdfasd"
                header={
                  <Link to={`/note/${item.noteId}`}>
                    <div
                      key={item.noteId}
                      className={`${styles.markedText} ${styles.foundHeader}`}
                      dangerouslySetInnerHTML={{
                        __html: item.nameHighlight[0],
                      }}
                    />
                  </Link>
                }
              >
                {item.bodyHighlight.map((innerItem, index) => {
                  return (
                    <Link key={index} to={`/note/${item.noteId}`}>
                      <div style={{ padding: 0 }}>
                        <p
                          key={index + `__${item.noteId}`}
                          style={{
                            paddingLeft: 12,
                            margin: 0,
                          }}
                          className={styles.markedText}
                          dangerouslySetInnerHTML={{ __html: innerItem }}
                        />
                        {item.bodyHighlight.length - index > 1 && (
                          <hr style={{ opacity: 0.2 }}></hr>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </Panel>
            );
          } else {
            return (
              <Panel
                className="asdfasdfadfasd"
                header={
                  <Link to={`/note/${item.noteId}`}>
                    <div
                      className={`${styles.markedText} ${styles.foundHeader}`}
                      dangerouslySetInnerHTML={{
                        __html: item.nameHighlight[0],
                      }}
                    ></div>
                  </Link>
                }
                key={item.noteId}
                showArrow={false}
                style={{ padding: 0 }}
              ></Panel>
            );
          }
        })}
      </Collapse>
      {findList && findList.length == 0 && (
        <Empty
          description={'Ничего не найдено'}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default CustomFindContainer;
