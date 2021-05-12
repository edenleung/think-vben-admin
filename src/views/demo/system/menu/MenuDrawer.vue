<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import {
    getMenuTree,
    createMenu,
    updateMenu,
    createMenuAction,
    updateMenuAction,
  } from '/@/api/demo/system';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const selectedId = ref(0);

      const [
        registerForm,
        { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue },
      ] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          selectedId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuTree();
        updateSchema({
          field: 'pid',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let action: Promise<any>;
          if (values.type === 'action') {
            action =
              unref(selectedId) === 0
                ? createMenuAction(values)
                : updateMenuAction(unref(selectedId), values);
          } else {
            action =
              unref(selectedId) === 0 ? createMenu(values) : updateMenu(unref(selectedId), values);
          }
          await action;
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit, getFieldsValue };
    },
  });
</script>
