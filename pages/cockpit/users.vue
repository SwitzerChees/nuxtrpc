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
          <h1 class="text-2xl font-bold">{{ $t('allUsers') }}</h1>
          <IconField icon-position="left">
            <InputIcon class="flex items-center"><Icon name="material-symbols:search" /></InputIcon>
            <InputText v-model="input.filter" :placeholder="$t('search')" />
          </IconField>
        </div>
      </template>
      <Column field="username" :header="$t('username')" class="truncate" sortable></Column>
      <Column field="roles" :header="$t('roles')" class="truncate max-w-24 min-w-24">
        <template #body="{ data: { roles } }">
          <div v-if="roles?.length" class="flex gap-1">
            <span v-for="role in roles" :key="role.id" class="p-1 px-2 truncate rounded bg-stone-700">{{ $t(role.name) }}</span>
          </div>
        </template>
      </Column>
    </DataTable>
    <UserDetails
      v-model="selectedUser"
      class="pl-4 overflow-hidden transition-all duration-300 ease-in-out"
      :class="{
        'w-0': !selectedUser,
        'w-1/3': selectedUser,
      }" />
  </div>
</template>

<script setup lang="ts">
  import { DefaultDatatableStyle } from '~/definitions'

  definePageMeta({
    layout: 'cockpit',
  })

  const selectedUser = ref<(typeof APIRoutes.User.Get.Output.users)[0]>()
  const input = useSSReactive<typeof APIRoutes.User.Get.Input>('users-dt', {
    filter: '',
    limit: 10,
    offset: 0,
    orderBy: 'username',
    orderByASC: true,
    roles: true,
  })

  const { data, execute } = useAPI(APIRoutes.User.Get, {
    input,
    watch: [() => input.filter],
    watchDebounce: 300,
  })

  const { paginate } = usePaginate(input, execute)
</script>
