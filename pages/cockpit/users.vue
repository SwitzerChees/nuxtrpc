<template>
  <DataTable
    v-model:expanded-rows="expandedRows"
    :value="users"
    class="grow"
    highlight-on-select
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
    <Column expander style="width: 5rem" />
    <Column field="id" header="ID" sortable class="max-w-20"></Column>
    <Column field="username" header="Username" sortable></Column>
    <template #expansion="{ data }">
      <UserSessions :user-id="data.id" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'cockpit',
  })
  const expandedRows = ref([])

  const fetchUsers = useAPI(APIRoutes.User.Get, {
    input: {
      sessions: true,
    },
    immediate: true,
  })

  const { data: users } = fetchUsers
</script>
