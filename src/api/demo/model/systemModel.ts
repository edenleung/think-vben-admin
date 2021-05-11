import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: number;
  username: string;
  email: string;
  nickname: string;
  create_time: string;
  update_time: string;
  avatar: string;
  status: number;
}

export interface DeptListItem {
  id: number;
  title: string;
  create_time: string;
  update_time: string;
  pid: number;
  status: number;
  children: DeptListItem[];
}

export interface MenuListItem {
  id: number;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}
export interface RoleListItem {
  id: number;
  title: string;
  status: number;
  create_time: string;
  update_time: string;
}

export type CreateAccountBodyItem = {
  username: string;
  password: string;
  roles: any;
  dept_id: number;
  nickname: string;
};

export type CreateRoleBodyItem = {
  title: string;
  status: number;
  actions: any;
};

export type MenuItemBody = {
  title: string;
  status: number;
  type: string;
  path: string;
};

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
