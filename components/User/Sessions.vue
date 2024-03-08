<template>
  <DataTable :value="sessions" sort-field="expiresAt" :sort-order="1">
    <template #header>
      <h2 class="text-xl font-bold">Active Sessions</h2>
    </template>
    <template #empty>
      <div class="text-center text-red-400">No active Sessions.</div>
    </template>
    <Column field="id" header="ID" sortable class="truncate max-w-20"></Column>
    <Column field="expiresAt" header="Expires At" sortable class="truncate max-w-20">
      <template #body="{ data: { expiresAt } }">
        <span>{{ formatDate(expiresAt, true) }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
  const props = defineProps<{ userId: string }>()

  const input = reactive(props)
  const { data: sessions } = useAPI(APIRoutes.User.Sessions, {
    input,
    watch: [input],
  })
</script>
