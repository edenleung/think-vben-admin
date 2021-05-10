<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="100%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" @success="successForm">
      <template #menu>
        <BasicTable @register="registerTable" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, h } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Checkbox } from 'ant-design-vue';
  import { BasicColumn } from '/@/components/Table';

  import { createRole, getMenuTree, getRole, updateRole } from '/@/api/demo/system';
  import { MenuListGetResultModel } from '/@/api/demo/model/systemModel';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let selecteId = ref(0);

      const dataSource = ref<Recordable[]>([]);
      const allActionIds = ref<Recordable[]>([]);
      const selectedIds = ref<Recordable[]>([]);

      const columns: BasicColumn[] = [
        {
          title: '操作对象',
          dataIndex: 'title',
          align: 'left',
        },
        {
          title: '勾选权限',
          align: 'left',
          customRender: ({ record }) => {
            return h(
              Checkbox.Group,
              {
                value: record.selected,
                onChange: () => {
                  changeAction(record);
                },
              },
              () => {
                return record.actions.map((item) => {
                  return h(
                    Checkbox,
                    {
                      onChange: (e) => {
                        if (record.selected.indexOf(e.target.value) === -1) {
                          record.selected.push(item.id);
                        } else {
                          record.selected.splice(
                            record.selected.findIndex((i) => i === item.id),
                            1
                          );
                          const values = getFieldsValue();
                          values.actions.splice(
                            values.actions.findIndex((i) => i === item.id),
                            1
                          );
                        }
                      },
                      value: item.id,
                      disabled: item.disabled,
                    },
                    () => item.title
                  );
                });
              }
            );
          },
        },
      ];

      const changeAction = (record) => {
        let notDisabledLen = 0;
        record.actions.map((action) => {
          if (action.disabled === false) {
            notDisabledLen = notDisabledLen + 1;
          }
        });
        record.indeterminate = !!record.selected.length && record.selected.length < notDisabledLen;
        record.checkedAll = record.selected.length === notDisabledLen;
        const values = getFieldsValue();
        const selected = values.actions ? [...values.actions, ...record.selected] : record.selected;
        setFieldsValue({
          actions: Array.from(new Set(selected)),
        });
      };

      const [registerTable] = useTable({
        dataSource,
        columns,
        useSearchForm: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: false,
      });

      const rulesSelectedInit = (_rules: MenuListGetResultModel[], _allActionIds: any[] = []) => {
        for (const i in _rules) {
          if (_rules[i].type === 'menu') {
            const item = Object.assign(_rules[i], {
              selected: [],
              indeterminate: false,
              checkedAll: false,
              disabled: false,
            });

            // 初始化状态
            item.actions.map((action) => {
              if (selectedIds.value.indexOf(action.id) !== -1) {
                item.selected.push(action.id);
              }
              _allActionIds.push(action.id);
              action.disabled = false;
              return action;
            });
          }
          if (_rules[i].children && _rules[i].type !== 'action') {
            rulesSelectedInit(_rules[i].children, _allActionIds);
          }
        }

        return { _rules, _allActionIds };
      };

      const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          selecteId.value = data.record.id;
          const { actions } = await getRole(data.record.id);
          selectedIds.value = actions;
          setFieldsValue({
            ...data.record,
            actions,
          });
        }

        const result = await getMenuTree();
        const { _rules, _allActionIds } = rulesSelectedInit(result);
        dataSource.value = _rules;
        allActionIds.value = _allActionIds;
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const action = !unref(isUpdate)
            ? createRole(values)
            : updateRole(unref(selecteId), values);
          await action;
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        registerTable,
        getFieldsValue,
      };
    },
  });
</script>
