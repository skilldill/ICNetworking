/** Generate by swagger-axios-codegen */
// tslint:disable
/* eslint-disable */
import axiosStatic, { AxiosInstance } from 'axios';

export interface IRequestOptions {
  headers?: any;
  baseURL?: string;
  responseType?: string;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

const basePath = '/api';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AchievementsService {
  /**
   *
   */
  static achievementsList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsCreate(
    params: {
      /**  */
      data: Achievement;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Achievement> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsAchievementsProfilesList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsAchievementsProfilesCreate(
    params: {
      /**  */
      data: AchievementProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AchievementProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsAchievementsProfilesRead(options: IRequestOptions = {}): Promise<AchievementProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
 * Принимает PUT/PATCH запросы в следюущем виде:
{
    "profile": 1,
    "achievement": 1,
    "scored": "True"
}
 */
  static achievementsAchievementsProfilesUpdate(
    params: {
      /**  */
      data: AchievementProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AchievementProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsAchievementsProfilesPartialUpdate(
    params: {
      /**  */
      data: AchievementProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AchievementProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsAchievementsProfilesDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/achievements_profiles/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsRead(options: IRequestOptions = {}): Promise<Achievement> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsUpdate(
    params: {
      /**  */
      data: Achievement;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Achievement> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsPartialUpdate(
    params: {
      /**  */
      data: Achievement;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Achievement> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static achievementsDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/achievements/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class UsersService {
  /**
   *
   */
  static usersList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersCreate(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDeactivateUser(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/deactivate_user/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsCreate(
    params: {
      /**  */
      data: Department;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Department> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsRead(options: IRequestOptions = {}): Promise<Department> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsUpdate(
    params: {
      /**  */
      data: Department;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Department> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsPartialUpdate(
    params: {
      /**  */
      data: Department;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Department> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDepartmentsDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/departments/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsCreate(
    params: {
      /**  */
      data: Interest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Interest> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsRead(options: IRequestOptions = {}): Promise<Interest> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsUpdate(
    params: {
      /**  */
      data: Interest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Interest> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsPartialUpdate(
    params: {
      /**  */
      data: Interest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Interest> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersInterestsDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/interests/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersLogin(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/login/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersLogout(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/logout/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsCreate(
    params: {
      /**  */
      data: Position;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Position> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsRead(options: IRequestOptions = {}): Promise<Position> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsUpdate(
    params: {
      /**  */
      data: Position;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Position> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsPartialUpdate(
    params: {
      /**  */
      data: Position;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Position> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPositionsDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/positions/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * Кастомная фильтрация профилей для тиндер-функционала.
   */
  static usersProfilesList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesCreate(
    params: {
      /**  */
      data: UserProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesList(
    params: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ordering: params['ordering'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesCreate(
    params: {
      /**  */
      data: ProfilePicture;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProfilePicture> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesRead(options: IRequestOptions = {}): Promise<ProfilePicture> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesUpdate(
    params: {
      /**  */
      data: ProfilePicture;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProfilePicture> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesPartialUpdate(
    params: {
      /**  */
      data: ProfilePicture;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProfilePicture> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesProfilePicturesDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/profile_pictures/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesRead(options: IRequestOptions = {}): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesUpdate(
    params: {
      /**  */
      data: UserProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesPartialUpdate(
    params: {
      /**  */
      data: UserProfile;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersProfilesDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/profiles/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersRead(options: IRequestOptions = {}): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersUpdate(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}/';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersPartialUpdate(
    params: {
      /**  */
      data: User;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}/';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}/';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface Achievement {
  /**  */
  id: number;

  /**  */
  name: string;

  /**  */
  description: string;

  /**  */
  goal: number;

  /**  */
  progress_per_step: number;

  /**  */
  level: EnumAchievementLevel;

  /**  */
  parent_achievement: number;

  /**  */
  parent_achievement_name: string;
}

export interface AchievementProfile {
  /**  */
  id: number;

  /**  */
  profile: number;

  /**  */
  achievement: number;

  /**  */
  achievement_name: string;

  /**  */
  progress: number;

  /**  */
  achieved: boolean;
}

export interface User {
  /**  */
  id: number;

  /**  */
  username: string;

  /**  */
  first_name: string;

  /**  */
  last_name: string;

  /**  */
  middle_name: string;

  /**  */
  email: string;

  /**  */
  date_joined: Date;

  /**  */
  is_active: boolean;

  /**  */
  password: string;

  /**  */
  last_login: Date;
}

export interface Department {
  /**  */
  id: number;

  /**  */
  name: string;
}

export interface Interest {
  /**  */
  id: number;

  /**  */
  name: string;
}

export interface Position {
  /**  */
  id: number;

  /**  */
  name: string;
}

export interface ProfilePicture {
  /**  */
  picture: string;

  /**  */
  profile: number;
}

export interface UserProfile {
  /**  */
  id: number;

  /**  */
  user: number;

  /**  */
  user_data: User;

  /**  */
  interests: number[];

  /**  */
  interest_names: string[];

  /**  */
  position: number;

  /**  */
  position_name: string;

  /**  */
  department: number;

  /**  */
  department_name: string;

  /**  */
  gallery: ProfilePicture[];

  /**  */
  bio: string;

  /**  */
  achievements_achieved: number;
}
export enum EnumAchievementLevel {
  'KEY_1' = '1',
  'KEY_2' = '2',
  'KEY_3' = '3'
}
