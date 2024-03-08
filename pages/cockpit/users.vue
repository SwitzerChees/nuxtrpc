<template>
  <div class="flex grow">
    <DataTable
      v-model:selection="selectedUser"
      :value="users"
      class="grow"
      highlight-on-select
      selection-mode="single"
      scrollable
      :scroll-height="'calc(100vh - 120px)'"
      paginator
      :rows="10"
      striped-rows
      sort-mode="single"
      sort-field="username"
      :sort-order="1">
      <template #header>
        <h1 class="text-2xl font-bold">Users</h1>
      </template>
      <Column field="id" header="ID" sortable class="truncate max-w-20"></Column>
      <Column field="username" header="Username" class="truncate" sortable></Column>
      <template #expansion="{ data }">
        <UserSessions :user-id="data.id" />
      </template>
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
  definePageMeta({
    layout: 'cockpit',
  })

  const { data: users } = useAPI(APIRoutes.User.Get)
  const selectedUser = ref<{ id: number } | undefined>()
</script>
