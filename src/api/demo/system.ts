import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  CreateAccountBodyItem,
  CreateRoleBodyItem,
  MenuItemBody,
  DeptItemBody,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/user',
  Dept = '/dept',
  Menu = '/menu',
  RolePageList = '/role',
  GetAllRoleList = '/role/all',
  CreateAccount = '/user',
  MenuTree = '/menu/tree',
  Role = '/role',
  Action = '/action',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.Dept, params });

export const createDept = (params: DeptItemBody) => defHttp.post<any>({ url: Api.Dept, params });

export const updateDept = (id: number, params: DeptItemBody) =>
  defHttp.put<any>({ url: `${Api.Dept}/${id}`, params });

export const deleteDept = (id: number) => defHttp.delete<any>({ url: `${Api.Dept}/${id}` });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.Menu, params });

export const createMenu = (params: MenuItemBody) => defHttp.post<any>({ url: Api.Menu, params });

export const updateMenu = (id: number, params: MenuItemBody) =>
  defHttp.put<any>({ url: `${Api.Menu}/${id}`, params });

export const deleteMenu = (id: number) => defHttp.delete<any>({ url: `${Api.Menu}/${id}` });

export const createMenuAction = (params: MenuItemBody) =>
  defHttp.post<any>({ url: Api.Action, params });

export const updateMenuAction = (id: number, params: MenuItemBody) =>
  defHttp.put<any>({ url: `${Api.Action}/${id}`, params });

export const deleteMenuAction = (id: number) => defHttp.delete<any>({ url: `${Api.Action}/${id}` });

export const getMenuTree = () => defHttp.get<MenuListGetResultModel>({ url: Api.MenuTree });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const createAccount = (params?: CreateAccountBodyItem) =>
  defHttp.post<any>({ url: Api.CreateAccount, params });

export const updateAccount = (id: any, params: CreateAccountBodyItem) =>
  defHttp.put<any>({ url: `${Api.CreateAccount}/${id}`, params });

export const deleteAccount = (id: any) =>
  defHttp.delete<any>({ url: `${Api.CreateAccount}/${id}` });

export const createRole = (params: CreateRoleBodyItem) =>
  defHttp.post<any>({ url: `${Api.Role}`, params });

export const getRole = (id: number) => defHttp.get<any>({ url: `${Api.Role}/${id}` });

export const updateRole = (id: number, params: CreateRoleBodyItem) =>
  defHttp.put<any>({ url: `${Api.Role}/${id}`, params });

export const deleteRole = (id: number) => defHttp.delete<any>({ url: `${Api.Role}/${id}` });
