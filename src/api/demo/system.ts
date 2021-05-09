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
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/user',
  DeptList = '/dept',
  MenuList = '/menu',
  RolePageList = '/role',
  GetAllRoleList = '/role/all',
  CreateAccount = '/user',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

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
