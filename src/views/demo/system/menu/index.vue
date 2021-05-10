<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #menu="{ record }">
        <template v-if="record.type !== 'menu'">-</template>
        <a-popover
          title="详情"
          placement="topLeft"
          v-for="(action, index) in record.actions"
          :key="index"
        >
          <template #content>
            <div style="margin-bottom: 15px">唯一识别码: {{ action.name }}</div>
            <a-button
              size="small"
              type="primary"
              ghost
              @click="showActionModal(action)"
              style="margin-right: 10px"
              >编辑</a-button
            >
            <a-button size="small" type="danger" ghost @click="showDeleteConfirm(action.id)"
              >删除</a-button
            >
          </template>
          <a-tag>{{ action.title }}</a-tag>
        </a-popover>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuTree } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '菜单列表',
        api: getMenuTree,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function showActionModal(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function showDeleteConfirm() {}

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        showActionModal,
        showDeleteConfirm,
      };
    },
  });
</script>
