import { defHttp } from '/@/utils/http/axios';
import { getUserMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenu = '/user/menus',
}

/**
 * @description: Get user menu based on id
 */

export const getUserMenuList = () => {
  return defHttp.get<getUserMenuListResultModel>({ url: Api.GetMenu });
};
