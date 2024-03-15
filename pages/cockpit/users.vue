<template>
  <div class="flex grow">
    <DataTable
      v-model:selection="selectedUser"
      v-bind="DefaultDatatableStyle"
      :value="data?.users"
      class="grow"
      :scroll-height="'calc(100vh - 120px)'"
      :rows="input.limit"
      :total-records="data?.total"
      :first="input.offset"
      :sort-field="input.orderBy"
      :sort-order="input.orderByASC ? 1 : -1"
      :current-page-report-template="`{first} ${$t('to')} {last} ${$t('of')} {totalRecords}`"
      @page="paginate"
      @update:sort-field="input.orderBy = $event"
      @update:sort-order="input.orderByASC = $event === 1">
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Users</h1>
          <IconField icon-position="left">
            <InputIcon><Icon name="material-symbols:search" /></InputIcon>
            <InputText v-model="input.filter" placeholder="Search" />
          </IconField>
        </div>
      </template>
      <Column field="id" header="ID" class="truncate max-w-20"></Column>
      <Column field="username" header="Username" class="truncate" sortable></Column>
    </DataTable>
    <UserDetails
      :user-id="selectedUser?.id"
      class="pl-4 overflow-hidden transition-all duration-300 ease-in-out"
      :class="{
        'w-0': !selectedUser,
        'w-1/4': selectedUser,
      }" />
  </div>
</template>

<script setup lang="ts">
  import { DefaultDatatableStyle } from '~/definitions'

  definePageMeta({
    layout: 'cockpit',
  })

  const route = useRoute()
  const selectedUser = useCookie<{ id?: number } | undefined>('users-dt-selected', {
    path: route.path,
  })
  const input = useCookie<typeof APIRoutes.User.Get.Input>('users-dt', {
    default: () => ({
      filter: '',
      limit: 10,
      offset: 0,
      orderBy: 'username',
      orderByASC: true,
    }),
    path: route.path,
  })

  watch(
    () => input.value.filter,
    () => (input.value.offset = 0),
  )
  watch([() => input.value.orderBy, () => input.value.orderByASC], () => {
    input.value.offset = 0
    execute()
  })

  const { data, execute } = useAPI(APIRoutes.User.Get, {
    input: input.value,
    watch: [() => input.value.filter],
    watchDebounce: 300,
  })

  const paginate = (e: { page: number; rows: number }) => {
    input.value.offset = e.page * e.rows
    input.value.limit = e.rows
    execute()
  }
</script>
