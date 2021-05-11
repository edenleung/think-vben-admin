import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoByUserIdModel } from './model/userModel';

import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  Login = '/auth/login',
  GetUserInfo = '/user/info',
  GetPermission = '/user/permission',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoByUserIdModel>({
    url: Api.GetUserInfo,
  });
}

export function getPermission() {
  return defHttp.get<string[]>({
    url: Api.GetPermission,
  });
}
