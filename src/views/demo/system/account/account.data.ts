import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    show: false,
  },
  {
    field: 'roles',
    label: '角色',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      numberToString: true,
      api: getAllRoleList,
      labelField: 'title',
      valueField: 'id',
    },
    rules: [
      {
        required: true,
        type: 'array',
      },
    ],
  },
  {
    field: 'dept_id',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: { title: 'title', key: 'title', value: 'id' },
      getPopupContainer: () => document.body,
    },
    rules: [
      {
        required: true,
        type: 'integer',
      },
    ],
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },
];
