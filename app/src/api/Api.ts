/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetSnippetsResponse {
  snippets: Snippet[];
}

export interface Snippet {
  /**
   * @format int32
   * @example 1
   */
  snippetId: number;
  /**
   * Название сниппета
   * @example "integral"
   */
  name: string;
  /**
   * Описание сниппета
   * @example "Определенный интеграл"
   */
  description: string;
  /**
   * Тело сниппета
   * @example "```$$\alpha$$```"
   */
  body: string;
  /**
   * ID владельца сниппета
   * @format int32
   * @example 1
   */
  userId: number;
}

export interface NoteSearchResponse {
  items: NoteSearchItem[];
}

export interface NoteSearchItem {
  /**
   * @format int32
   * @example 1
   */
  noteId: number;
  /**
   * Название заметки
   * @example "TestName"
   */
  name: string;
  bodyHighlight: string[];
  nameHighlight: string[];
}

export interface LoginRequest {
  /**
   * Электронная почта
   * @example "default@default.ru"
   */
  email: string;
  /**
   * Пароль
   * @example "secret"
   */
  password: string;
}

export interface RegisterRequest {
  /**
   * Электронная почта
   * @example "default@default.ru"
   */
  email: string;
  /**
   * Пароль
   * @example "secret"
   */
  password: string;
  /**
   * имя пользователя
   * @example "name"
   */
  name?: string;
  /**
   * фамилия пользователя
   * @example "surname"
   */
  surname?: string;
  /**
   * ник пользователя
   * @example "username"
   */
  username: string;
}

export interface ImagePreprocessRequest {
  /** @format binary */
  image: File;
  /** @example 1 */
  threshold: number;
  /** @example "flase" */
  apply_fft: boolean;
}

export interface ImagePreprocessResponse {
  /** @format binary */
  image: File;
  /** @example 1 */
  threshold: number;
}

export interface UserInfo {
  /**
   * Электронная почта
   * @example "default@default.ru"
   */
  email: string;
  /**
   * Пароль
   * @example "secret"
   */
  password: string;
  /**
   * имя пользователя
   * @example "name"
   */
  name?: string;
  /**
   * фамилия пользователя
   * @example "surname"
   */
  surname?: string;
  /**
   * ник пользователя
   * @example "username"
   */
  username: string;
}

export interface SearchRequest {
  /**
   * Поисковый запрос
   * @example "Новая заметка"
   */
  query: string;
}

export interface Dir {
  /**
   * Числовой идентификатор папки
   * @format int32
   * @example 1337
   */
  dirId?: number;
  /**
   * Название папки
   * @example "TestName"
   */
  name?: string;
  /**
   * Числовой идентификатор создателя папки
   * @format int32
   * @example 1337
   */
  userId?: number;
  /**
   * Числовой идентификатор родительской папки
   * @format int32
   * @example 1337
   */
  parentDir?: number;
  /**
   * Ссылка на URL иконки
   * @example ""
   */
  iconUrl?: string;
  subdirs?: Dir[];
}

export interface Note {
  /**
   * ID заметки
   * @format int32
   * @example 1
   */
  noteId?: number;
  /**
   * Заголовок заметки
   * @example "Test header"
   */
  name?: string;
  /**
   * Тело заметки в формате, который понимает редактор
   * @example "Test body"
   */
  body?: string;
  /**
   * Дата создания заметки.
   * @format date-time
   * @example "2017-01-01T00:00:00.000Z"
   */
  createdAt?: string;
  /**
   * Дата последенго изменения заметки.
   * @format date-time
   * @example "2017-01-01T00:00:00.000Z"
   */
  lastUpdate?: string;
  /**
   * ID папки, которой принадлежит заметка
   * @format int32
   * @example 1
   */
  parentDir?: number;
  /**
   * ID пользователя, которому принадлежит заметка
   * @format int32
   * @example 1
   */
  userId?: number;
}

export interface NotePreview {
  /**
   * ID заметки
   * @format int32
   * @example 1337
   */
  noteId: number;
  /**
   * Заголовок заметки
   * @example "Test header"
   */
  name: string;
  /**
   * ID папки, которой принадлежит заметка
   * @format int32
   * @example 1337
   */
  parentDir: number;
}

export interface NoteCreationResponse {
  /**
   * ID заметки
   * @format int32
   * @example 1337
   */
  noteId: number;
}

export interface DirCreationResponse {
  /**
   * ID папки
   * @format int32
   * @example 1337
   */
  dirId?: number;
}

export interface Error {
  /**
   * Текстовое описание ошибки
   * @example "note with this id not found"
   */
  msg: string;
}

export interface NotesOverview {
  notes?: NotePreview[];
}

export interface DirsOverview {
  dirs?: Dir[];
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://smartlectures.ru/api/v1',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title EasyTex API
 * @version 0.1.9
 * @baseUrl https://smartlectures.ru/api/v1
 *
 * Документация по API EasyTex
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  notes = {
    /**
     * @description Создание заметки
     *
     * @tags notes
     * @name NotesCreate
     * @summary Создание заметки
     * @request POST:/notes
     * @secure
     */
    notesCreate: (data: Note, params: RequestParams = {}) =>
      this.request<NoteCreationResponse, Error>({
        path: `/notes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Получение информации о заметка для отображения превью
     *
     * @tags notes
     * @name OverviewList
     * @summary Получение заметок для отображения структуры
     * @request GET:/notes/overview
     * @secure
     */
    overviewList: (params: RequestParams = {}) =>
      this.request<NotesOverview, Error>({
        path: `/notes/overview`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Получение заметки.
     *
     * @tags notes
     * @name NotesDetail
     * @summary Получение заметки по ID
     * @request GET:/notes/{noteId}
     * @secure
     */
    notesDetail: (noteId: number, params: RequestParams = {}) =>
      this.request<Note, Error>({
        path: `/notes/${noteId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Обновление заметки.
     *
     * @tags notes
     * @name NotesUpdate
     * @summary Обновление заметки по ID
     * @request PUT:/notes/{noteId}
     * @secure
     */
    notesUpdate: (noteId: number, data: Note, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/notes/${noteId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Удаление заметки.
     *
     * @tags notes
     * @name NotesDelete
     * @summary Удаление заметки по ID
     * @request DELETE:/notes/{noteId}
     * @secure
     */
    notesDelete: (noteId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/notes/${noteId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags notes
     * @name DownloadMdDetail
     * @summary Получение заметки в виде md файла
     * @request GET:/notes/{noteId}/download/md
     * @secure
     */
    downloadMdDetail: (noteId: number, params: RequestParams = {}) =>
      this.request<File, Error>({
        path: `/notes/${noteId}/download/md`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags notes
     * @name DownloadPdfDetail
     * @summary Получение заметки в виде pdf файла
     * @request GET:/notes/{noteId}/download/pdf
     * @secure
     */
    downloadPdfDetail: (noteId: number, params: RequestParams = {}) =>
      this.request<File, Error>({
        path: `/notes/${noteId}/download/pdf`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags notes
     * @name SearchCreate
     * @summary Поиск заметок
     * @request POST:/notes/search
     * @secure
     */
    searchCreate: (data: SearchRequest, params: RequestParams = {}) =>
      this.request<NoteSearchResponse, Error>({
        path: `/notes/search`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  dirs = {
    /**
     * No description
     *
     * @tags dirs
     * @name DirsCreate
     * @summary Создание папки
     * @request POST:/dirs
     * @secure
     */
    dirsCreate: (data: Dir, params: RequestParams = {}) =>
      this.request<DirCreationResponse, Error>({
        path: `/dirs`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags dirs
     * @name DirsDetail
     * @summary Получение папки по ID
     * @request GET:/dirs/{dirId}
     */
    dirsDetail: (dirId: number, params: RequestParams = {}) =>
      this.request<Dir, Error>({
        path: `/dirs/${dirId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags dirs
     * @name DirsUpdate
     * @summary Обновление папки по ID
     * @request PUT:/dirs/{dirId}
     */
    dirsUpdate: (dirId: number, data: Dir, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/dirs/${dirId}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dirs
     * @name DirsDelete
     * @summary Удаление папки по ID
     * @request DELETE:/dirs/{dirId}
     */
    dirsDelete: (dirId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/dirs/${dirId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Получение структры папок пользователя для отображения структуры файлов/папок
     *
     * @tags dirs
     * @name OverviewList
     * @summary Получение структры папок пользователя
     * @request GET:/dirs/overview
     */
    overviewList: (params: RequestParams = {}) =>
      this.request<DirsOverview, Error>({
        path: `/dirs/overview`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  images = {
    /**
     * No description
     *
     * @tags images
     * @name UploadCreate
     * @request POST:/images/upload
     */
    uploadCreate: (
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          src?: string;
        },
        Error
      >({
        path: `/images/upload`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
  recognizer = {
    /**
     * No description
     *
     * @tags recognizer
     * @name FormulaCreate
     * @request POST:/recognizer/formula
     */
    formulaCreate: (
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          text?: string;
        },
        Error
      >({
        path: `/recognizer/formula`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags recognizer
     * @name TextCreate
     * @request POST:/recognizer/text
     */
    textCreate: (
      data: {
        images?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          text?: string;
        },
        Error
      >({
        path: `/recognizer/text`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags recognizer
     * @name PostRecognizer
     * @request POST:/recognizer/pdf
     */
    postRecognizer: (
      data: {
        /** @format binary */
        data?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          text?: string;
        },
        Error
      >({
        path: `/recognizer/pdf`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags recognizer
     * @name MixedCreate
     * @request POST:/recognizer/mixed
     */
    mixedCreate: (
      data: {
        images?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          text?: string;
        },
        Error
      >({
        path: `/recognizer/mixed`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
  snippets = {
    /**
     * @description Получение списка сниппетов
     *
     * @tags snippets
     * @name SnippetsList
     * @summary Получение списка сниппетов
     * @request GET:/snippets
     */
    snippetsList: (params: RequestParams = {}) =>
      this.request<
        {
          snippets: Snippet[];
        },
        Error
      >({
        path: `/snippets`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags snippets
     * @name SearchCreate
     * @summary Поиск сниппетов
     * @request POST:/snippets/search
     */
    searchCreate: (data: SearchRequest, params: RequestParams = {}) =>
      this.request<
        {
          items?: Snippet[];
        },
        Error
      >({
        path: `/snippets/search`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  preprocessor = {
    /**
     * No description
     *
     * @tags preprocessor
     * @name PreprocessorCreate
     * @summary Обработка входящего изображения
     * @request POST:/preprocessor
     */
    preprocessorCreate: (
      data: {
        /** @format binary */
        image?: File;
        /** Число в виде строки от 0 до 255 */
        threshold?: string;
        /** True или False */
        apply_fft?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImagePreprocessResponse, any>({
        path: `/preprocessor`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary Авторизация пользователя
     * @request POST:/auth/login
     */
    loginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name RegisterUpdate
     * @summary Регистрация пользователя
     * @request PUT:/auth/register
     */
    registerUpdate: (data: RegisterRequest, params: RequestParams = {}) =>
      this.request<
        {
          items?: Snippet[];
        },
        Error
      >({
        path: `/auth/register`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name LogoutDelete
     * @summary Удаление текущей авторизационной сессии
     * @request DELETE:/auth/logout
     */
    logoutDelete: (params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/auth/logout`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name GetAuth
     * @summary Получение информации о текущем пользователе
     * @request GET:/auth/me
     */
    getAuth: (params: RequestParams = {}) =>
      this.request<UserInfo, Error>({
        path: `/auth/me`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
