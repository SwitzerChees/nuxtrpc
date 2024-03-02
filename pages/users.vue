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
    sort-mode="single">
    <template #header>
      <h1 class="text-2xl font-bold">Users</h1>
    </template>
    <Column expander style="width: 5rem" />
    <Column field="id" header="ID" sortable class="max-w-20"></Column>
    <Column field="username" header="Username" sortable></Column>
    <template #expansion="slotProps">
      {{ slotProps }}
    </template>
  </DataTable>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const expandedRows = ref([])

  const fetchUsers = useAPI(APIRoutes.User.Get, {
    input: {
      sessions: true,
    },
    immediate: true,
    errorToast: true,
  })

  const { data: users } = fetchUsers
</script>
```
