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
      <DataTable v-if="data.sessions.length > 0" :value="data.sessions" sort-field="expiresAt" :sort-order="1">
        <template #header>
          <h2 class="text-xl font-bold">Active Sessions</h2>
        </template>
        <Column field="id" header="ID" sortable class="max-w-20"></Column>
        <Column field="expiresAt" header="Expires At" sortable class="max-w-20">
          <template #body="{ data: { expiresAt } }">
            <span>{{ formatDate(expiresAt, true) }}</span>
          </template>
        </Column>
      </DataTable>
      <div v-else class="text-center text-red-400">No active Sessions.</div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
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
